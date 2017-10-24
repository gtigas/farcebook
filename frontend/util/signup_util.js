import React from 'react';


export const years = [2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992,
      1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981,
       1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972, 1971, 1970,
        1969, 1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961, 1960,
         1959, 1958, 1957, 1956, 1955, 1954, 1953, 1952, 1951, 1950,
          1949, 1948, 1947, 1946, 1945, 1944, 1943, 1942, 1941, 1940,
           1939, 1938, 1937, 1936, 1935, 1934, 1933, 1932, 1931, 1930,
            1929, 1928, 1927, 1926, 1925, 1924, 1923, 1922, 1921, 1920,
             1919, 1918, 1917, 1916, 1915, 1914, 1913, 1912, 1911,
             1910, 1909, 1908, 1907, 1906, 1905]
           .map( year => <option key={year} value={year}>{year}</option>);

export const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
   16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
   .map( day => <option key={day} value={day}>{day}</option>);

export const months = [<option key='1' value='1'>Jan</option>,
              <option key='2' value='2'>Feb</option>,
              <option key='3' value='3'>Mar</option>,
              <option key='4' value='4'>Apr</option>,
              <option key='5' value='5'>May</option>,
              <option key='6' value='6'>Jun</option>,
              <option key='7' value='7'>Jul</option>,
              <option key='8' value='8'>Aug</option>,
              <option key='9' value='9'>Sep</option>,
              <option key='10' value='10'>Oct</option>,
              <option key='11' value='11'>Nov</option>,
              <option key='12' value='12'>Dec</option>]
