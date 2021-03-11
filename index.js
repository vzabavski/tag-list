import { TagController } from './TagController.js'

const tagInput = document.querySelector('.tag-form__input');
const tagButton = document.querySelector('.tag-form__button');
const tagList = document.querySelector('.tag-list');
const readonlyInput = document.querySelector('.readonly-form__input');

const initialTagList = localStorage.getItem('Tags') ? JSON.parse(localStorage.getItem('Tags')) : [];
const Tag = new TagController(initialTagList);

const createList = (arr) => {
    tagList.innerHTML = '';
    arr.forEach(item => tagList.appendChild(createTag(item)));
}

const createTag = (value) => {
    const listItem = document.createElement('li');
    listItem.classList.add('tag-list__item');

    const tag = document.createElement('span');
    listItem.appendChild(tag);
    tag.innerText = value;
    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.innerHTML = '<i class="fas fa-times"></i>';
    listItem.appendChild(deleteButton);
    
    tagInput.value = '';
    localStorage.setItem('Tags', JSON.stringify(Tag.tagsList));
    return listItem;
}

const removeTag = (event) => {
    const target = event.target;
    if(target.classList[0] === 'delete-btn') {
        const item = target.parentElement;
        item.remove();
        Tag.removeTag(target.previousSibling.innerText);
        localStorage.setItem('Tags', JSON.stringify(Tag.tagsList));
    }
}

document.addEventListener("DOMContentLoaded", () => createList(Tag.tagsList));
tagButton.addEventListener('click', () => {
    Tag.addTag(tagInput.value); 
    createList(Tag.tagsList);
});
tagList.addEventListener('click', removeTag);
readonlyInput.addEventListener('click', () => Tag.setReadonly(readonlyInput.checked));