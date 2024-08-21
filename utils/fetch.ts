type Params = {
  url: Url;
  options?: Options;
  errorHandler?: () => void;
};
type Url = string | URL | Request;
type Options = RequestInit;

export const fetchWithErorHandler = async <T>({
  url,
  options,
  errorHandler,
}: Params): Promise<T | string> => {
  try {
    const res = await fetch(url, options);
    return await res.json();
  } catch (error) {
    if (errorHandler) {
      errorHandler();
    }
    return "작업 중 문제가 발생했습니다.";
  }
};
