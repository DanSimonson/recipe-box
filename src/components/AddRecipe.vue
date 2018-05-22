<template>
    <div class="add-recipe container z-depth-1">
        <h2 class="center-align indigo-text">Add Recipe</h2>
        <form @submit.prevent="addRecipe">
            <div class="field title">
                <label for="title">Recipe title:</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div v-for="(ingredient, index) in ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient"</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIngredient(ingredient)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an Ingredient:</label>
                <input type="text" name="add-ingredient" @keydown.tab="addIngredient" v-model="another">
                <span@click="addIngredient" v-model="another">
                    <i class="material-icons">add_circle_outline</i>
                    </span>
            </div>
            <div class=" field center-align ">
                <p v-if="feedback" class="red-text"> {{ feedback }} </p>
                <button class="btn pink ">Add Recipe</button>
            </div>
        </form>
    </div>
    </form>

</template>
<script>
    import db from '@/firebase/init'
    import slugify from 'slugify'

    export default {
        name: "AddRecipe ",
        another: '',
        data() {
            return {
                title: null,
                another: null,
                ingredients: [],
                feedback: null,
                slug: null
            }
        },
        methods: {
            addRecipe() {
                //console.log(this.title, this.ingredients)
                if (this.title) {
                    this.feedback = null
                    // create a slug
                    this.slug = slugify(this.title, {
                        replacement: '-',
                        remove: /[$*_+~.()'"!\-:@]/g,
                        lower: true
                    })
                    db.collection('recipes').add({
                        title: this.title,
                        ingredients: this.ingredients,
                        slug: this.slug
                    }).then(() => {
                        this.$router.push({ name: 'Index' })
                    }).catch(error => {
                        console.log(error)
                    })
                } else {
                    this.feedback = 'You must enter a recipe title'
                }
            },
            addIngredient() {
                if (this.another) {
                    this.ingredients.push(this.another)
                    this.another = null
                    this.feedback = null
                } else {
                    this.feedback = "You must enter a value to add an ingredient"
                }
            },
            deleteIngredient(ing) {
                this.ingredients = this.ingredients.filter((ingredient) => {
                    return this.ingredient != ing
                })
            }
        }
    }
</script>

<style>
    i {
        display: inline-block;
    }

    i:hover {
        cursor: pointer;
    }

    .add-recipe {
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }

    .add-recipe h2 {
        font-size: 2em;
        margin: 20px auto;
    }

    .add-recipe .field {
        margin: 20px auto;
        position: relative;
    }

    .add-recipe .delete {
        position: absolute;
        right: 0;
        bottom: 16px;
        color: #aaa;
        font-size: 1.4em;
        cursor: pointer;
    }
</style>