export default ({
    namespaced: true,
    state: {
        articles: [
            {
                id: 1,
                title: "What is Lorem Ipsum?",
                text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                date: "01/09/2021",
                tema: "sport",
                author: "Hayk",
                img: "card.jpeg"
            },
            {
                id: 2,
                title: "Why do we use it?",
                text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
                date: "01/03/2021",
                tema: "politics",
                author: "Henry",
                img: "card1.jpeg"
            },
            {
                id: 3,
                title: "Where does it come from?",
                text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.",
                date: "02/07/2021",
                tema: "health",
                author: "Mary",
                img: "card2.jpg"
            },
            {
                id: 4,
                title: "Where can I get some?",
                text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
                date: "02/03/2021",
                tema: "sport",
                author: "John",
                img: "card3.jpg"
            },
        ],
        search_text: ""
    },
    getters: {
        getArticles: state => {
            return state.articles.filter((article) => {
                return article.title.toLowerCase().match(state.search_text.toLowerCase())
            })
        }
    },
    mutations: {
        GET_AND_SET_STORGAE(state){
            if(JSON.parse(localStorage.getItem('articles'))){
                state.articles = JSON.parse(localStorage.getItem('articles'));
            } else {
                localStorage.setItem('articles', JSON.stringify(state.articles))
            }
        },
        SET_SEARCH_RESULT(state, payload){
            state.search_text = payload
        },
        SORT_BY_ALPHA(state){
            state.articles.sort((a, b) => (a.title > b.title) ? 1 : -1);
        },
        SORT_BY_DATE(state){
            state.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
        },
        EDIT_CARD(state, payload){
            for (let article in state.statearticles){
                if(state.articles[article].id == payload.id){
                    state.articles[article] = payload;
                    localStorage.setItem('articles', JSON.stringify(state.articles))
                    return;
                }
            }
        },
        ADD_ARTICLE(state, payload){
            payload.id = state.articles.length + 1;
            state.articles.push(payload);
            localStorage.setItem('articles', JSON.stringify(state.articles))
        }
    },
  })
  