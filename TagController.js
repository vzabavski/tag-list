export class TagController {
    constructor(tags) {
        this._tags = tags
    }
    get tagsList () {
        return this._tags
    }
    set tagsList (arr) {
        if(!Array.isArray(arr)) {
            window.alert('It\'s not an array')
            throw new Error('It\'s not an array')
        }
        this._tags = arr
        localStorage.setItem('Tags', JSON.stringify(arr))
    }
    addTag (str) {
        if(str === '') {
            window.alert('Your tag is empty')
            throw new Error('Your tag is empty')
        }
        this._tags = this._tags.concat([str])
    }
    removeTag(str) {
        const index = this._tags.findIndex(tag => tag === str)
        index !== 0 ? this._tags.splice(index, index) : this._tags = []
        
    }
    setReadonly (bool) {
        const tagForm = document.querySelector('.tag-form')
        const deleteBtn = document.querySelectorAll('.delete-btn')
        if(bool) {
            tagForm.classList.add('readonly')
            deleteBtn.forEach(item => item.classList.add('readonly'))
        } else {
            tagForm.classList.remove('readonly')
            deleteBtn.forEach(item => item.classList.remove('readonly'))
        }
    }
}