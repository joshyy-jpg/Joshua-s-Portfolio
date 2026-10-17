/** Optical water layer: refracts the submerged scene and reflects light above it. */
export function createWaterSurface(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' })
  if (!gl) return null
  const shaders: WebGLShader[] = []
  const program = gl.createProgram()!
  const compile = (type: number, source: string) => {
    const s = gl.createShader(type)!
    shaders.push(s); gl.shaderSource(s, source); gl.compileShader(s)
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'Water shader')
    return s
  }
  try {
    gl.attachShader(program, compile(gl.VERTEX_SHADER, `attribute vec2 p;varying vec2 uv;void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}`))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, `
precision highp float;
varying vec2 uv;
uniform sampler2D scene;
uniform vec2 size;
uniform float time;
uniform vec3 wakes[12];
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 a=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(a),hash(a+vec2(1,0)),f.x),mix(hash(a+vec2(0,1)),hash(a+1.),f.x),f.y);}
float surface(vec2 p){
 // Broad, irregular surface movement avoids parallel wave bands.
 vec2 flow=p*.006+vec2(time*.025,-time*.018);
 float h=(noise(flow)-.5)*1.1;
 h+=(noise(flow*1.83+vec2(-time*.04, time*.025))-.5)*.35;
 for(int i=0;i<12;i++){
  vec2 d=p-wakes[i].xy;
  float age=wakes[i].z;
  float r=length(d*vec2(1.,1.14));
  float front=age*27.+10.;
  float envelope=exp(-pow((r-front)/36.,2.))*exp(-age*.36)*smoothstep(0.,.4,age);
  h+=sin((r-front)*.10)*envelope*.16;
 }
 return h;
}
void main(){
 vec2 p=vec2(uv.x,1.-uv.y)*size;
 float h=surface(p);
 vec2 slope=vec2(surface(p+vec2(2.,0.))-h,surface(p+vec2(0.,2.))-h)*.5;
 vec2 bend=vec2(slope.x,-slope.y)*3.0/size;
 vec3 koi=texture2D(scene,clamp(uv+bend,vec2(.001),vec2(.999))).rgb;
 // Water absorbs contrast; the highlights are drawn over (and obscure) the fish.
 vec3 color=koi*.82;
 // Only facets facing a narrow reflected light source catch silver highlights.
 // The rest of the pond stays black, without an illuminated noise/cloud texture.
 vec2 normal=slope*vec2(1.,1.3);
 float facet=exp(-pow((normal.x-.012)/.034,2.)-pow((normal.y+.010)/.032,2.));
 float sky=noise(p*.006+vec2(time*.022,-time*.014));
 float patch=smoothstep(.42,.73,sky);
 float field=1.-smoothstep(.52,.94,p.y/size.y);
 float light=facet*patch*field*.14;
 color+=vec3(.65)*light;
 color+=vec3(.0015);
 float edge=smoothstep(0.,.12,uv.x)*smoothstep(0.,.12,1.-uv.x)*smoothstep(0.,.12,uv.y)*smoothstep(0.,.12,1.-uv.y);
 color*=.5+.5*edge;
 gl_FragColor=vec4(color,1.);
}`))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Water linking')
  } catch { shaders.forEach(s=>gl.deleteShader(s)); gl.deleteProgram(program); return null }
  gl.useProgram(program)
  const buffer=gl.createBuffer()!
  gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW)
  const attr=gl.getAttribLocation(program,'p')
  gl.enableVertexAttribArray(attr);gl.vertexAttribPointer(attr,2,gl.FLOAT,false,0,0)
  const texture=gl.createTexture()!
  gl.bindTexture(gl.TEXTURE_2D,texture)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  const uTime=gl.getUniformLocation(program,'time'), uSize=gl.getUniformLocation(program,'size'), uWakes=gl.getUniformLocation(program,'wakes[0]')
  const lost = () => { canvas.style.opacity='0' }
  canvas.addEventListener('webglcontextlost',lost)
  return {
    draw(source:HTMLCanvasElement,width:number,height:number,time:number,wakes:Float32Array){
      const scale=Math.min(1,1200/width,850/height)
      const w=Math.round(width*scale),h=Math.round(height*scale)
      if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h)}
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,source)
      gl.uniform1f(uTime,time);gl.uniform2f(uSize,width,height);gl.uniform3fv(uWakes,wakes)
      gl.drawArrays(gl.TRIANGLES,0,3)
      canvas.style.opacity='1'
    },
    dispose(){canvas.removeEventListener('webglcontextlost',lost);canvas.style.opacity='0';gl.deleteTexture(texture);gl.deleteBuffer(buffer);shaders.forEach(s=>gl.deleteShader(s));gl.deleteProgram(program)}
  }
}
