document.addEventListener('DOMContentLoaded', () => {
  const log = console.log;
  const titleInput = document.getElementById('title');
  const bodyInput = document.getElementById('body');
  const mid = document.querySelector('.mid');
  const feedback = document.getElementById('feedback');

  let blogPosts = JSON.parse(localStorage.getItem('Blog Posts')) || []; // without the |this wil alwys return null|

  document.addEventListener('submit', e => {
    e.preventDefault();
    if (!titleInput.value.trim()) {
      feedback.style.display = 'block';
      feedback.textContent = 'Please provide a Title for your Post';
    } else if (!bodyInput.value.trim()) {
      feedback.style.display = 'block';
      feedback.textContent = 'Please provide a Body for your Post';
    } else {
      feedback.style.display = 'none';
      const blogPost = {
        id: blogPosts.length + 1,
        title: titleInput.value.trim(),
        body: bodyInput.value.trim(),
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
      .sort((a, b) => b.id - a.id)
      .map(
        ({ title, body, dateCreated, id }) => `
          <div class="card-panel">
             <div className="content">
              <h5>${title}</h5>
              <p>${body}</p>
             </div>
            <div class="foot">
              <p>Posted on <small>${dateCreated}</small></p>
              <div class="bts" id=${id}>
                  <i class="material-icons  icon blue-text" id="edit" >edit</i>
                  <i class="material-icons icon red-text" id="delete">delete</i>
              </div>
            </div>
          </div>`
      )
      .join('');
    mid.innerHTML = storageString;
  };
  if (blogPosts) {
    getLocalStorage();
    const mid = document.querySelector('.mid');
    mid.addEventListener('click', e => {
      if (e.target.id === 'edit') {
        // update logig goes here
      } else if (e.target.id === 'delete') {
        let parentID = e.target.parentNode.id;
        blogPosts = blogPosts.filter(({ id }) => id != parentID);
        localStorage.setItem('Blog Posts', JSON.stringify(blogPosts));
        getLocalStorage();
      }
    });
  }
});
