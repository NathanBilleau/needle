export const get = async <T = any>(url: string, token: string): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return await response.json();
};

export const post = async <T = any>(
  url: string,
  token: string,
  body: any,
): Promise<T> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return await response.json();
};
