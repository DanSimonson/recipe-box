<template>
    <div v-if='recipe' class="edit-recipe container">
        <!--<h2>Edit a Smoothie {{ this.$route.params.recipe_slug }}</h2>-->
        <h2>Edit a Recipe {{ recipe.title }}</h2>
        <form @submit.prevent="editRecipe">
            <div class="field title">
                <label for="title">Recipe title:</label>
                <input type="text" name="title" v-model="recipe.title">
            </div>
            <div v-for="(ingredient, index) in recipe.ingredients" :key="index" class="field">
                <label for="ingredient">Ingredient"</label>
                <input type="text" name="ingredient" v-model="recipe.ingredients[index]">
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
                <button class="btn pink ">Update Recipe</button>
            </div>
        </form>
    </div>
</template>

<script>
    import db from '@/firebase/init'
    import slugify from 'slugify'

    export default {
        name: 'EditRecipe',
        data() {
            return {
                recipe: null,
                another: null,
                feedback: null
            }
        },
        methods: {

            editRecipe() {
                //console.log(this.recipe.title, this.recipe.ingredients)
                //console.log(this.title, this.ingredients)
                if (this.recipe.title) {
                    this.feedback = null
                    // create a slug
                    this.recipe.slug = slugify(this.recipe.title, {
                        replacement: '-',
                        remove: /[$*_+~.()'"!\-:@]/g,
                        lower: true
                    })
                    db.collection('recipes').doc(this.recipe.id).update({
                        title: this.recipe.title,
                        ingredients: this.recipe.ingredients,
                        slug: this.recipe.slug
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
                    this.recipe.ingredients.push(this.another)
                    this.another = null
                    this.feedback = null
                } else {
                    this.feedback = "You must enter a value to add an ingredient"
                }
            },
            deleteIngredient(ing) {
                this.recipe.ingredients = this.recipe.ingredients.filter((ingredient) => {
                    return ingredient != ing
                })
            }
        },
        created() {
            let ref = db.collection('recipes').where('slug', '==', this.$route.params.recipe_slug)
            ref.get().then(snapshot => {
                snapshot.forEach(doc => {
                    //console.log(doc.data())
                    this.recipe = doc.data()
                    this.recipe.id = doc.id
                })
            })
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

    .edit-recipe {
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }

    .edit-recipe h2 {
        font-size: 2em;
        margin: 20px auto;
    }

    .edit-recipe .field {
        margin: 20px auto;
        position: relative;
    }

    .edit-recipe .delete {
        position: absolute;
        right: 0;
        bottom: 16px;
        color: #aaa;
        font-size: 1.4em;
        cursor: pointer;
    }
</style>