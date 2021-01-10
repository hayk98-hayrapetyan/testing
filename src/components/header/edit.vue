<template>
  <div class="edit">
    <the-modal>
        <svg @click="$emit('close-popup')" class="position-absolute closes cursor" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="20.3428" width="28.7692" height="2.61538" rx="1.30769" transform="rotate(-45 0 20.3428)" fill="#282827"/>
            <rect x="1.84961" y="0.342773" width="28.7692" height="2.61538" rx="1.30769" transform="rotate(45 1.84961 0.342773)" fill="#282827"/>
        </svg>
        <div class="title">
            <h6 class="mr">{{$t('login.name')}}</h6>
            <input 
                @input='error = false'
                type="text" 
                v-model.lazy="my.name"
                :class="{error: ((!$v.my.name.required && $v.my.name.$dirty) || !$v.my.name.minLength || !$v.my.name.maxLength) && error}"
            >
        </div>
        <div class="title">
            <h6 class="mr">{{$t('login.email')}}</h6>
            <input 
                @input='error = false'
                type="text" 
                v-model="my.email" 
                :class="{error: ((!$v.my.email.required && $v.my.email.$dirty) || !$v.my.email.email) && error}"
            />
        </div>
        <div class="title">
            <h6 class="mr">{{$t('login.password')}}</h6>
            <input 
                @input='error = false'
                v-model="my.password" 
                :class="{error: ((!$v.my.password.required && $v.my.password.$dirty) || !$v.my.password.alphaNum || !$v.my.password.minLength || first_letter_error || alpha_numeric_error) && error}"
            />
        </div>
        <div class="title">
            <h6 class="mr">{{$t('login.avatar')}}</h6>
            <img 
                :src="my.avatar"  
                @click="$refs.changeImg.click()"
            />
            <input style="display: none" ref="changeImg" type="file" @change="changeImg($event)">
        </div>
        <span v-if="size_error && error">{{$t('size_error')}}</span>
        <div class="text-center button">
            <button class="login cursor" @click="edit">{{$t('edit')}}</button>
        </div>
    </the-modal>
  </div>
</template>

<script>
import TheModal from "@/components/modal/";
import { mapMutations } from 'vuex';
import { required, minLength, maxLength, email, alphaNum } from 'vuelidate/lib/validators';

export default {
    components: {TheModal},
    props: ['user'],
    data(){
        return {  
            my: {
                name: this.user.name,
                email: this.user.email,
                password: this.user.password,
                avatar: this.user.avatar,
            },         
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
        edit(){
            this.$v.$touch();
            this.checkPassword();
            if(!this.$v.$invalid && !this.first_letter_error && !this.alpha_numeric_error && !this.size_error){
                this.SET_USER(this.my);
                this.$emit('close-popup');
            } else {
                this.error = true;
            }
        },
        changeImg(e){
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
                vm.my.avatar = e.target.result
            }
            reader.readAsDataURL(file)
        },
        checkPassword(){
            //first letter uppercase
            !this.my.password.match(/^[A-Z]./) ? this.first_letter_error = true : this.first_letter_error = false
            //contain letters and numbers
            !this.my.password.match(/^[A-Z](?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/) ? this.alpha_numeric_error = true : this.alpha_numeric_error = false;
        }
    },
    validations: {
        my: {
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
.edit {
    text-align: center!important;
    .button {
        margin: 25px auto;
    }
    .mr {
        margin-right: 20px;
    }
    .title {
        display: flex;
        align-items: center;
        margin: 15px 0;
    }
    h6 {
        width: 120px;
        text-align: left;
    }
    input {
        background: transparent;
        outline: none;
        width: 500px;
        padding: 15px 10px;
        border: 1px solid #282827;
        -webkit-box-shadow: inset 4px 3px 8px -1px rgba(0, 0, 0, 0.25);
                box-shadow: inset 4px 3px 8px -1px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        color: #ffffff;
    }
    img {
        height: 100px;
    }
    span {
        color: red;
    }
}
</style>