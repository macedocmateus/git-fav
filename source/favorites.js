export class GithubUser {
    static search(username) {
        const endpoint = `http://api.github.com/users/${username}`

        return fetch(endpoint)
        .then(data => data.json())
        .then(
            ({login, name, public_repos, followers}) =>(
            {
              login,
              name,
              public_repos,
              followers
            }))
    }
}

// classe que vai conter a lógica dos dados
// como os dados serão estruturados
export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()

        GithubUser.search('macedocmateus').then(user => console.log(user))
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem
        ('@github-favorites:')) || []
    }

    async add(username) {
      try {
        const user = await GithubUser.search(username)

        if(user.login === undefined) {
            throw new Error('Usuário não encontrado!')
        }

        this.entries = [user, ...this.entries]
        this.update()

      } catch(error) {
        alert(error.message)
      }  
    }

    delete(user) {
        const filteredEntries = this.entries
        .filter(entry => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
    }
}
// classe que vai criar a visualização e eventos do html

export class FavoritesViews extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
        this.onadd()
    }

    onadd() {
        const addButton = this.root.querySelector('.search button')
        addButton.onclick = () => {
            const { value } = this.root.querySelector('.search input')

            this.add(value)
        }
    }

    update() {
        this.removeAllTr()

        
        
        this.entries.forEach(user => {
           const row = this.createRow()

           row.querySelector('.user img').src = `https://github.com/${user.login}.png`
           row.querySelector('.user img').alt = `Imagem de ${user.name}`
           row.querySelector('.user p').textContent = user.name
           row.querySelector('.user span').textContent = user.login
           row.querySelector('.repositories').textContent = user.public_repos
           row.querySelector('.followers').textContent = user.followers

           row.querySelector('.remove').onclick = () => {
            const isOk = confirm('Deseja realmente deletar esta linha ?')
            if (isOk) {
                this.delete(user)
            }

           }
           
           this.tbody.append(row)

        })

    }

    createRow() {
        const tr = document.createElement('tr')
        
        tr.innerHTML = `
        <td class="user">
            <img src="https://github.com/macedocmateus.png" alt="imagem de mateus macedo">
            <a href="https://github.com/macedocmateus" target="_blank">
                <p>Mateus Macedo</p>
                <span>macedocmateus</span>
            </a>
        </td>
        <td class="repositories">
            12
        </td>
        <td class="followers">
            321
        </td>
        <td>
            <button class="remove">&times;</button>
        </td>
    `

        return tr
    }

    removeAllTr() {
        this.tbody.querySelectorAll('tr')
        .forEach((tr) => {
            tr.remove()
        })
    }
}