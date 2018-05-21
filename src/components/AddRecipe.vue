<template>
    <div class="add-recipe container z-depth-1">
        <h2 class="center-align indigo-text">Add Recipe</h2>
        <form @submit.prevent="addRecipe">
            <div class="field title">
                <label for="title">Recipe title:</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an Ingredient:</label>
                <input type="text" name="add-ingredient" @keydown.tab="addIngredient" v-model="another">
                <span@click="addIngredient" v-model="another">
                    <i class="fa fa-plus"></i>
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
    export default {
        name: "AddRecipe ",
        another: '',
        data() {
            return {
                title: null,
                another: null,
                ingredients: [],
                feedback: null
            }
        },
        methods: {
            addRecipe() {
                console.log(this.title, this.ingredients)
            },
            addIngredient() {
                if (this.another) {
                    this.ingredients.push(this.another)
                    this.another = null
                    this.feedback = null
                } else {
                    this.feedback = "You must enter a value to add an ingredient"
                }
            }
        }
    }
</script>

<style>
    i {
        display: inline;
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
    }
</style>