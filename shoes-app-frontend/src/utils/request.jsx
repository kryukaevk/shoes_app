export function request(url, method, data) {
     const options = {
          method: method || 'GET',
     };

     if (data) {
          if (data instanceof FormData) {
               options.body = data;
          } else {
               options.headers = {
                    'content-type': 'application/json',
               };
               options.body = JSON.stringify(data);
          }
     }

     return fetch(url, options).then((res) => {
          if (!res.ok) {
               return res.text().then((text) => {
                    throw new Error(`Ошибка сервера: ${res.status} ${text}`);
               });
          }
          const contentType = res.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
               return res.json();
          } else {
               return res.text().then((text) => {
                    throw new Error(`Ожидался JSON, получено: ${text}`);
               });
          }
     });
}
