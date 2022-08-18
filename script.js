const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

async function getUser(username){
   try{
      const {data} = await axios(APIURL + username)

      createUserInfo(data)
      getRepos(username)
   } catch(error){
      if(error.response.status == 404) {
         createErrorCard('No Such User Found')
      }

   }
}

async function getRepos(username){
   try{
      const {data} = await axios(APIURL + username + '/repos?sort=created')
      addReposToInfo(data)
   } catch(error){
         createErrorCard('Problem Fetching Repos')
   }
}


function createUserInfo(user) {
   const infoHTML = `
   <div class="info">
   <div>
      <img src="${user.avatar_url}" alt="${user.name}" class="picture">
   </div>
   <div class="user_info">
      <h2>${user.name}</h2>
      <p>${user.bio}</p>

      <ul>
         <li>${user.followers} Followers</li>
         <li>${user.following} Following</li>
         <li>${user.public_repos} Repos</li>
      </ul>

      <div id="repos">
      </div>
   </div>
</div>
   `
   main.innerHTML = infoHTML

}

function createErrorCard(msg) {
   const infoHTML = `
   <div class="info">
      <h1>${msg}</h1>
   </div>
   `

   main.innerHTML = infoHTML
}

function addReposToInfo(repos) {
   const reposEl = document.getElementById('repos')

   repos
      .slice(0,8)
      .forEach(repo => {
         const repoEl = document.createElement('a')
         repoEl.classList.add('repo')
         repoEl.href = repo.html_url
         repoEl.target = '_blank'
         repoEl.innerText = repo.name

         reposEl.appendChild(repoEl)
      })
}

//when you send a data
form.addEventListener('submit', (e) => {
   e.preventDefault()

   //search for the user
   const user = search.value

   if(user){
      getUser(user)
      search.value = " "
   }

})
