document.addEventListener('DOMContentLoaded', () => {
  const log = console.log;
  const title = document.getElementById('title');
  const body = document.getElementById('body');
  const mid = document.querySelector('.mid');
  const feedback = document.getElementById('feedback');

  let blogPosts = JSON.parse(localStorage.getItem('Blog Posts')) || []; // without the |this wil alwys return null|

  document.addEventListener('submit', e => {
    e.preventDefault();
    if (!title.value.trim()) {
      feedback.style.display = 'block';
      feedback.textContent = 'Please provide a Title for your Post';
    } else if (!body.value.trim()) {
      feedback.style.display = 'block';
      feedback.textContent = 'Please provide a Body for your Post';
    } else {
      feedback.style.display = 'none';
      const blogPost = {
        id: blogPosts.length + 1,
        title: title.value.trim(),
        body: body.value.trim(),
        dateCreated: new Date().toLocaleString()
      };
      blogPosts = [...blogPosts, blogPost];
      localStorage.setItem('Blog Posts', JSON.stringify(blogPosts));
      title.value = '';
      body.value = '';
      getLocalStorage();
    }
  });

  // get from localStorage
  const getLocalStorage = () => {
    let storageString = blogPosts
      .reverse()
      .map(
        ({ title, body, dateCreated }) => `
        <div class="card-panel">
           <div className="content">
            <h3>${title}</h3>
            <p>${body}</p>
           </div>
          <div class="foot">
            <p>Posted on <small>${dateCreated}</small></p>
            <div class="bts">
                <i class="material-icons  icon blue-text">edit</i>
                <i class="material-icons icon red-text">delete</i>
            </div>
          </div>
        </div>`
      )
      .join();
    mid.innerHTML = storageString;
  };
  if (blogPosts) getLocalStorage();
});
