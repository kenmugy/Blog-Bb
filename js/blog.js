document.addEventListener('DOMContentLoaded', () => {
  const titleInput = document.getElementById('title');
  const bodyInput = document.getElementById('body');
  const mid = document.querySelector('.mid');
  const feedback = document.getElementById('feedback');

  const modal = document.querySelector('.myModal');
  const close = document.getElementById('close');
  const updateButton = document.getElementById('updateBtn');
  const newTitle = document.getElementById('newTitle');
  const newBody = document.getElementById('newBody');

  let blogPosts = JSON.parse(localStorage.getItem('Blog Posts')) || []; // without the || this wil alwys return null

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
        id: Math.random() * 1,
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
      .sort((a, b) => a.dateCreated - b.dateCreated)
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
    // handle update and delete
    mid.addEventListener('click', e => {
      if (e.target.id === 'edit') {
        modal.style.display = 'block';
        let parentID = e.target.parentNode.id;
        const bToEdit = blogPosts.find(({ id }) => id == parentID);
        const { title, body } = bToEdit;
        newTitle.textContent = title;
        newBody.textContent = body;
        updateButton.addEventListener('click', () => {
          blogPosts = blogPosts.filter(({ id }) => id != parentID);
          const blogPost = {
            id: Math.random() * 1,
            title: newTitle.textContent.trim(),
            body: newBody.textContent.trim(),
            dateCreated: new Date().toLocaleString()
          };
          blogPosts = [...blogPosts, blogPost];
          log(blogPosts);
          modal.style.display = 'none';
          localStorage.setItem('Blog Posts', JSON.stringify(blogPosts));
          getLocalStorage();
        });

        close.addEventListener('click', () => {
          modal.style.display = 'none';
        });
        window.addEventListener('click', e => {
          if (e.target.className == 'myModal') modal.style.display = 'none';
        });
      } else if (e.target.id === 'delete') {
        let parentID = e.target.parentNode.id;
        blogPosts = blogPosts.filter(({ id }) => id != parentID);
        localStorage.setItem('Blog Posts', JSON.stringify(blogPosts));
        getLocalStorage();
      }
    });
  }
});
