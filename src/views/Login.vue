<template>
<div class="container">
    <h1 class="text-center">{{ $t('login.title') }}</h1>
    <form class="mx-auto text-center" @submit.prevent="login">
        <div class="field">
            <div class="input">
                <input 
                    @input='error = false'
                    type="text" 
                    :class="{error: ((!$v.user.name.required && $v.user.name.$dirty) || !$v.user.name.minLength || !$v.user.name.maxLength) && error}"
                    :placeholder="$t('login.name')"
                    v-model.lazy="user.name"
                />
            </div>
            <span v-if="!$v.user.name.required && $v.user.name.$dirty && error">{{ $t('login.field') }}</span>
            <span v-if="(!$v.user.name.minLength || !$v.user.name.maxLength) && error">{{ $t('login.min_max') }}</span>
        </div>
        <div class="field">
            <div class="input">
                <input 
                    @input='error = false'
                    type="text" 
                    :class="{error: ((!$v.user.email.required && $v.user.email.$dirty) || !$v.user.email.email) && error}"
                    :placeholder="$t('login.email')"
                    v-model.lazy="user.email"
                />
            </div>
            <span v-if="!$v.user.email.required && $v.user.email.$dirty && error">{{ $t('login.field') }}</span>
            <span v-if="!$v.user.email.email && error">{{ $t('login.emailError') }}</span>
        </div>
        <div class="field">
            <div class="input">
                <input 
                    @input='error = false'
                    type="password" 
                    :class="{error: ((!$v.user.password.required && $v.user.password.$dirty) || !$v.user.password.alphaNum || !$v.user.password.minLength) && error}"
                    :placeholder="$t('login.password')"
                    v-model.lazy="user.password"
                />
            </div>
            <span v-if="!$v.user.password.required && $v.user.password.$dirty && error">{{ $t('login.field') }}</span>
            <span v-if="!$v.user.password.minLength && error">{{ $t('login.min') }}</span>
            <span v-if="!$v.user.password.alphaNum && error">{{ $t('login.alpha') }}</span>
            <span v-if="first_letter_error && error">{{ $t('login.ferst_letter') }}</span>
            <span v-if="alpha_numeric_error && error">{{ $t('login.alpha_numeric') }}</span>
        </div>
        <div id="preview" class="position-relative" v-if="user.avatar">
            <img :src="user.avatar" alt="avatar" />
        </div>
        <div class="text-left">
            <input ref="avatar" @input='error = false' type="file" @change="AddAvatar($event)">
            <span v-if="avatar_error && error">{{$t('login.add_avatar')}}</span>
            <span v-if="size_error && error">{{$t('size_error')}}</span>
        </div>
        <div class="text-center">
            <button class="login cursor">{{$t('login.login')}}</button>
        </div>
    </form>
</div>
</template>

<script>
import { required, minLength, maxLength, email, alphaNum } from 'vuelidate/lib/validators';
import {mapMutations} from "vuex";

export default {
    data(){
        return {
            user: {
                name: "",
                email: "",
                password: "",
                avatar: "",
            },            
            avatar_error: false,
            first_letter_error: false,
            alpha_numeric_error: false,
            error: false,
            size_error: false
        }
    },
    methods: {
        ...mapMutations({
            SET_USER: "auth/SET_USER"
        }),
        login(){
            this.$v.$touch();
            this.checkAvatar();
            this.checkPassword();
            if(!this.$v.$invalid && !this.avatar_error && !this.first_letter_error && !this.alpha_numeric_error && !this.size_error){
                this.SET_USER(this.user);
                this.$router.push({path: "/"})
            } else {
                this.error = true;
            }
        },
        AddAvatar(e){
            this.avatar_error = false;
            var files = e.target.files || e.dataTransfer.files
            if (!files.length) {
            return
            }
            this.createImage(files[0])
        },
        createImage(file) {
            if(file.size > 500000){
                this.size_error = true;
                return;
            }
            this.size_error = false;
            var reader = new FileReader()
            var vm = this

            reader.onload = (e) => {
                vm.user.avatar = e.target.result
            }
            reader.readAsDataURL(file)
        },
        checkAvatar(){
            !this.user.avatar ? this.avatar_error = true : this.avatar_error = false;
        },
        checkPassword(){
            //first letter uppercase
            !this.user.password.match(/^[A-Z]./) ? this.first_letter_error = true : this.first_letter_error = false
            //contain letters and numbers
            !this.user.password.match(/^[A-Z](?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/) ? this.alpha_numeric_error = true : this.alpha_numeric_error = false;
        }
    },
    validations: {
        user: {
            name: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(15),
            },
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(8),
                alphaNum
            },
            avatar: {
                required
            }
        }
    },
}
</script>

<style lang='scss' scoped>
.container {
    max-width: 782px;
    width: 100%;
    background: #1c1c1c;
    border-radius: 20px;
    padding: 40px 40px 10px;
    z-index: 77777777;
    margin: 50px auto;
    form {
        max-width: 412px;
        width: 100%;
        margin: 50px auto;
    }
    .field {
        margin: 30px auto;
        width: 100%;
        text-align: left;
    }
    .input {
        border: 1px solid #282827;
        -webkit-box-shadow: inset 4px 3px 8px -1px rgba(0, 0, 0, 0.25);
                box-shadow: inset 4px 3px 8px -1px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        width: 100%;
        height: 50px;
    }
    input {
        outline: none;
        border: none;
        background: transparent;
        width: 100%;
        padding: 10px 15px;
        height: 100%;
        color: #ffffff;
    }
    #preview {
        text-align: left;
        width: 100%;
        max-width: 170px;
        max-height: 170px;
        img {
            max-width: 100%;
            max-height: 100px;
        }
    }
    .login {
        width: 135px;
        height: 39px;
        margin-top: 20px;
        &:focus {
            outline: none;
            box-shadow: unset;
        }
    }
    span {
        color: red;
        font-size: 12px;
        padding-left: 15px;
        display: block;
    }
}
</style>

