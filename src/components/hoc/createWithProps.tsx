export const createWithProps = <T extends {}>(Component: React.ElementType, props: T) => {
  return <Component {...props}/>
}