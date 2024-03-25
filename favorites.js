// classe que vai conter a lógica dos dados
// como os dados ser'~ao estruturados
export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    load() {
        this.users = [
            {
                login: 'mateuscmacedo',
                name: 'Mateus Macedo',
                public_repos: '76',
                followers:'50',
            },

            {
                login: 'falezinqueiroz',
                name: 'Rafael Queiroz',
                public_repos: '124',
                followers:'520',
            }
        ]

        
    }

    delete(user) {
        const filteredUsers = this.users
        .filter(users => users.login !== user.login)

        this.users = filteredUsers
        this.update()
        
    }
}

    

// classe que vai criar a visualização e eventos do html

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)
        
        this.tbody = this.root.querySelector('table tbody')
        
        this.update()
    }

    update() {
        this.removeAllTr()

        
        
        this.users.forEach( user => {
            const row = this.createRow()

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers
            
            row.querySelector('.remove').onclick = () => {
                
                const isOk = confirm('Tem certeza que deseja deletar esse usuário?')
                
                if(isOk) {
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