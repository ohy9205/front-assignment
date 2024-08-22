type Params = {
  url: Url;
  options?: Options;
  errorHandler: () => void;
};
type Url = string | URL | Request;
type Options = RequestInit;

export const fetchWithErorHandler = async <T>({
  url,
  options,
  errorHandler,
}: Params): Promise<T | undefined> => {
  try {
    const res = await fetch(url, {
      cache: "no-cache",
      ...options,
    });

    if (!res.ok) {
      throw new Error(`${res.status} Error occured`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);

    errorHandler();
  }
};
