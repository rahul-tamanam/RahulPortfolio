type LogoProps = React.ImgHTMLAttributes<HTMLImageElement>

function Logo(props: LogoProps) {
  const { width = 20, height = width, alt = 'Logo', ...rest } = props
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src='/images/logo.png'
      alt={alt}
      width={width}
      height={height}
      className='inline-block'
      {...rest}
    />
  )
}

export { Logo }
