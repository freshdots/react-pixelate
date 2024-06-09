import React, { useEffect, useRef } from "react"

const colors = [
  `rgb(211,211,211,0.9)`,
  `rgb(194,194,194,0.9)`,
  `rgb(234,234,234,0.9)`,
  `rgb(187,187,187,0.9)`,
  `rgb(176,176,176,0.9)`,
  `rgb(205,205,205,0.9)`,
  `rgb(225,225,225,0.9)`,
  `rgb(233,233,233,0.9)`,
  `rgb(220,220,220,0.9)`,
  `rgb(228,228,228,0.9)`
]

export type ElementPixelatedProps = {
  pixelSize?: number
}

export const ElementPixelated = ({
  children,
  pixelSize = 5
}: ElementPixelatedProps & { children: JSX.Element }) => {
  const childNodeRef = useRef<HTMLDivElement>()
  const canvasRef = useRef<HTMLCanvasElement>()
  useEffect(() => {
    const paintPixels = ({
      ctx,
      img,
      pixelSize
    }: {
      ctx: CanvasRenderingContext2D
      img: HTMLImageElement
      pixelSize: number
    }) => {
      if (!isNaN(pixelSize) && pixelSize > 0) {
        for (let x = 0; x < img.width + pixelSize; x += pixelSize) {
          for (let y = 0; y < img.height + pixelSize; y += pixelSize) {
            // Random color and paint it
            const colorIndex = Math.floor(Math.random() * 10)
            ctx.fillStyle = colors[colorIndex]
            ctx.fillRect(x, y, pixelSize, pixelSize)
          }
        }
      }
    }
    const pixelate = () => {
      const { offsetWidth, offsetHeight } = childNodeRef.current
      // create img that will be later painted into the canvas
      let img = new Image(offsetWidth, offsetHeight)
      img.crossOrigin = "anonymous"

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d", { willReadFrequently: true })
      img.width = img.width
      img.height = img.height
      canvas.width = img.width
      canvas.height = img.height
      // we paint the image into the canvas
      // this is needed to get RGBA info out of each pixel
      ctx.drawImage(img, 0, 0, img.width, img.height)
      paintPixels({ ctx, img, pixelSize })
      img = null
    }

    pixelate()
  }, [pixelSize])

  return (
    <div style={{ position: "relative" }} ref={childNodeRef}>
      {children}
      <canvas
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }}
        ref={canvasRef}
      />
    </div>
  )
}
