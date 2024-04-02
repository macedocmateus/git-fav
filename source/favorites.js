// classe que vai conter a lógica dos dados
// como os dados serão estruturados
export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    load() {
        this.entries = [
            {
                login: 'macedocmateus',
                name: 'Mateus Macedo',
                public_repos: '12',
                followers: '6'
            },
            {
                login: 'rafaelqueiroz88',
                name: 'Rafael Queiroz',
                public_repos: '87',
                followers: '23'
            }
        ]
        
         
    }
}
// classe que vai criar a visualização e eventos do html

export class FavoritesViews extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')

        this.update()
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