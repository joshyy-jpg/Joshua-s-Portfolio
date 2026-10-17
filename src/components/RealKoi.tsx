import { createWaterSurface } from '../lib/waterSurface'
import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../lib/motion'

/** Original photographic koi, articulated in thin strips along the swimming spine. */
export default function RealKoi({ active, enter = false }: { active: boolean; enter?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const waterRef = useRef<HTMLCanvasElement>(null)
  const enterRef = useRef(enter)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    const canvas = ref.current
    if (!canvas || !active) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return
    const water = waterRef.current ? createWaterSurface(waterRef.current) : null
    const wakes = new Float32Array(36)
    let disposed = false, frame = 0, last = 0, time = 0, visible = true
    let width = 1, height = 1, ratio = 1
    const fish = new Image()
    const render = () => {
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, width, height)
      if (!fish.complete || !fish.naturalWidth) return
      const mobile = width < 700
      const cx = width * .5, cy = height * .39
      const progress = reduced || !enterRef.current ? 1 : Math.min(1,Math.max(0,(time-1.1)/2.8))
      const spread = progress*progress*(3-2*progress)
      const compact = Math.min(width*.14,height*.14)
      const rx = compact+(width*(mobile ? .23 : .17)-compact)*spread
      const ry = compact+(height*.18-compact)*spread
      const startLength = compact*2.6
      const length = startLength+(Math.min(mobile ? width*.65 : width*.31,height*.51)-startLength)*spread
      ctx.globalCompositeOperation = 'source-over'
      // Arc-length sampling: each vertebra occupies an earlier point on the head's
      // route. Turns therefore bend the whole spine instead of rotating a rigid fish.
      const route = (q: number, i: number) => ({
        x: cx + rx * (Math.cos(q) + .12 * Math.sin(2*q + i)*spread),
        y: cy + ry * (Math.sin(q) + .11 * Math.sin(3*q + i*.8)*spread),
      })
      for (let i = 0; i < 2; i++) {
        const phase = (Math.max(0,time-1.1)*.153) + .055*Math.sin(time*.55+i)*spread + i*Math.PI + .35
        const len = length * (i ? 1-.17*spread : 1), wide = len * fish.width / fish.height
        const strips = 180, step = len / strips
        const points: {x:number;y:number}[] = []
        let q = phase
        for (let j = 0; j <= strips; j++) {
          const t = j/strips
          const at = route(q,i), ahead = route(q+.001,i)
          const dx = (ahead.x-at.x)/.001, dy = (ahead.y-at.y)/.001
          const speed = Math.max(1,Math.hypot(dx,dy))
          // A quiet head, muscular body stroke, then amplified tail propulsion.
          const stroke = Math.sin(t*7.8-time*2.8+i*1.7)*Math.pow(t,2.3)*len*.045
          const x = at.x-dy/speed*stroke, y = at.y+dx/speed*stroke
          // Small refractive displacement from the water above the fish.
          points.push({x:x+Math.sin(y*.029+time*.8)*1.3,
            y:y+Math.sin(x*.024-time*.65)*.9})
          q -= step/speed
        }
        const depth = .5+.5*Math.sin(time*.19+i*2.)
        ctx.globalAlpha = (i ? .63 : .79)-depth*.07
        for (let j = 0; j < strips; j++) {
          const t=j/strips, at=points[j], next=points[j+1]
          const angle=Math.atan2(next.y-at.y,next.x-at.x)-Math.PI/2
          const fin=1+Math.sin(time*2.3+i)*.055*Math.exp(-Math.pow((t-.3)/.12,2))
          ctx.save()
          ctx.translate(at.x,at.y);ctx.rotate(angle)
          ctx.drawImage(fish,0,t*fish.height,fish.width,fish.height/strips,
            -wide*fin/2,0,wide*fin,Math.hypot(next.x-at.x,next.y-at.y)+1.25)
          ctx.restore()
        }
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation='source-over'
      // Emit disturbances from actual earlier head positions. Rings remain behind
      // in the water while the fish swims ahead, rather than sticking to its sprite.
      for(let i=0;i<2;i++) {
        for(let k=0;k<6;k++) {
          const clock=time+i*.43
          const age=(clock%.72)+k*.72
          const emitted=time-age
          const phase=Math.max(0,emitted-1.1)*.153+.055*Math.sin(emitted*.55+i)*spread+i*Math.PI+.35
          const point=route(phase,i)
          const slot=(i*6+k)*3
          wakes[slot]=point.x;wakes[slot+1]=point.y;wakes[slot+2]=spread < .2 ? 100 : age
        }
      }
      water?.draw(canvas,width,height,time,wakes)

    }
    const running = () => !disposed && !reduced && visible && !document.hidden
    const tick = (now: number) => {
      frame = 0
      if (!running()) { last = 0; return }
      frame = requestAnimationFrame(tick)
      if (last && now - last < 32) return
      time += last ? Math.min((now-last)/1000, .08) : 0
      last = now
      render()
    }
    const sync = () => {
      cancelAnimationFrame(frame); frame = 0; last = 0
      if (running()) frame = requestAnimationFrame(tick)
    }
    const resize = () => {
      const box = canvas.getBoundingClientRect()
      width = box.width; height = box.height
      ratio = Math.min(devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width*ratio); canvas.height = Math.round(height*ratio)
      render()
    }
    fish.onload = () => { if (!disposed) { resize(); sync() } }
    fish.src = '/media/real-koi-vermilion.webp'
    const ro = new ResizeObserver(resize); ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync() }); io.observe(canvas)
    document.addEventListener('visibilitychange', sync)
    return () => { disposed = true; water?.dispose(); cancelAnimationFrame(frame); fish.onload = null; ro.disconnect(); io.disconnect(); document.removeEventListener('visibilitychange', sync) }
  }, [active, reduced])
  return <><canvas ref={ref} className="real-koi" aria-hidden="true" /><canvas ref={waterRef} className="koi-water" aria-hidden="true" /></>
}
