async function getPost() {
  try {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    let data = await response.json();
    console.log(data);
  } catch (err) {
    console.log('Fetch error:', err);
  }
}
getPost();
