export function getParameterIfPresentedOrThrow<
  Params extends { [K in keyof Params]?: string } = {}
>(params: Params, paramName: string): string {
  // @ts-ignore
  const param = params[paramName] as string | undefined;

  if (param) {
    return param;
  }

  throw new Error(`Parameter ${paramName} is not presented in params.`);
}
