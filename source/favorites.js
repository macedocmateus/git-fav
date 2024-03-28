// classe que vai conter a lógica dos dados
// como os dados ser'~ao estruturados

export class GithubUser {
    static search(username) {
        const endpoint = `https://api.github.com/users/${username}`

        return fetch(endpoint).then(data => data.json())
        .then(({login, name, public_repos, followers}) => ({
            login,
            name,
            public_repos,
            followers,
        }))
    }
}

export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    }

    save() {
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }


    async add(username) {
        try {


            const userExists = this.entries.find(entry => entry.login === username)

            if (userExists) {
                throw new Error('Usuário já cadastrado')
            }
                
            

            const user = await GithubUser.search(username)
    
            if(user.login === undefined) {
                throw new Error('Usuário não encontrador!')
            }

            this.entries = [user, ...this.entries]
            this.update()
            this.save()

        } catch(error) {
            alert(error.message)
        }
    }

    delete(user) {
        const filteredEntries = this.entries
        .filter(entry => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
        this.save()
    }

    onadd() {
        const addButton = this.root.querySelector('.search button')
        addButton.onclick = () => {
            const { value } = this.root.querySelector('.search input')

            this.add(value)
        }
    }
}

    

// classe que vai criar a visualização e eventos do html
export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)
        
        this.tbody = this.root.querySelector('table tbody')
        
        this.update()
        this.onadd()
    }

    update() {
        this.removeAllTr()

        this.entries.forEach(user => {
            const row = this.createRow()
            
            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user p').alt = `Imagem de ${user.name}`
            row.querySelector('.user p').textCotent = user.name
            row.querySelector('.user span').textCotent = user.login
            row.querySelector('.repositories').textCotent = user.public_repos
            row.querySelector('.followers').textCotent = user.followers
            
            this.tbody.append(row);
        });

    }

    createRow() {
        const tr = document.createElement('tr')
        
        tr.innerHTML = `
        <td class="user">
            <img src="https://github.com/macedocmateus.png" alt="Imagem de mateus macedo">
            <a href="https://github.com/macedocmateus" target="_blank">
                <p>Mateus Macedo</p>
                <span>MateusMacedo</span>
            </a>
        </td>
        <td class="repositories">
            76
        </td>
        <td class="followers">
            9598
        </td>
        <td class="remove">
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