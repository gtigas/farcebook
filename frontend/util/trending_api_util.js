export const fetchTrending = () =>{
  return $.ajax({
    url: 'https://newsapi.org/v1/articles',
    method: 'GET',
    data: {
      source: 'buzzfeed',
      sortBy: 'latest',
      apiKey: 'f23e91f2820c41a58d908f74e1cc5b4c'
    }
  });
};
