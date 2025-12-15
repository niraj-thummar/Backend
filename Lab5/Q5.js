const url = new URL('http://www.demo.com');

url.pathname = 'path/path1/path2';

url.searchParams.append('name','niraj');
url.searchParams.append('age',19);
url.searchParams.append('city','surat');

console.log(url.toString());