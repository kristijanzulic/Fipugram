<template>
  <!-- story -->

  <div class="row">
    <hr />
    <div class="col-2">
      <StoryCardVue />
    </div>
    <div class="col-8 story">
      <StoryCardVue />
      <StoryCardVue />
    </div>
    <div class="col-2"></div>
    <hr />
    <!-- Objave -->
    <div class="row">
      <div class="col-2"></div>
      <div class="col-7">
        <form @submit.prevent="postNewImage" class="form-inline mb-5">
          <div class="form-group">
            <label for="imageUrl">Image URL</label>
            <input
              v-model="newImageUrl"
              type="text"
              class="form-control ml-2"
              placeholder="Enter the image URL"
              id="imageUrl"
            />
          </div>
          <div class="form-group">
            <label for="imageDescription">Description</label>
            <input
              v-model="newImageDescription"
              type="text"
              class="form-control ml-2"
              placeholder="Enter the image description"
              id="imageDescription"
            />
          </div>
          <button type="submit" class="btn btn-primary ml-2">Post image</button>
        </form>
        <InstagramCard
          v-for="card in filterCards"
          :key="card.id"
          :info="card"
        />
      </div>
      <div class="col-3">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="">Ime</span>
          </div>
          <input type="text" class="form-control" v-model="store.ime" />
        </div>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="">Prezime</span>
          </div>
          <input type="text" class="form-control" v-model="store.prezime" />
        </div>
        <p>ovo je: {{ imePrezime }}</p>
        <!-- select -->
        <select>
          <option selected>Odaberi zupaniju</option>
          <option value="1" v-for="opcina in sortZup" :key="opcina.id">
            {{ opcina.zupanija }}
          </option>
        </select>
        <select>
          <option selected>Odaberi mjesto</option>
          <option value="1" v-for="opcina in sortMj" :key="opcina.id">
            {{ opcina.opcina }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import InstagramCard from "@/components/InstagramCard.vue";
import StoryCardVue from "@/components/StoryCard.vue";
import store from "@/store";
import {
  db,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "@/firebase";
import opcine from "@/assets/popis";

// let chars = ["A", "B", "A", "C", "B"];
// let uniqueChars = [new Set(opcine.opcina)];

// console.log(uniqueChars);

// // cards = [
// //   {
// //     url: "https://picsum.photos/id/1/800",
// //     descriptions: "laptop",
// //     time: "few minutes ago...",
// //   },
// //   {
// //     url: "https://picsum.photos/id/2/800",
// //     descriptions: "2",
// //     time: "few minutes ago...",
// //   },
// //   {
// //     url: "https://picsum.photos/id/3/800",
// //     descriptions: "laptop3 ",
// //     time: "few minutes ago...",
// //   },
// // ];

export default {
  name: "HomeView",
  data: function () {
    return {
      cards: [],
      store: store,
      newImageUrl: "",
      newImageDescription: "",
      popis: opcine,
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      const querySnapshot = query(
        collection(db, "objave"),
        orderBy("posted_at", "desc"),
        limit(3)
      );
      getDocs(querySnapshot).then((querySnapshot) => {
        this.cards = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          const data = doc.data();
          this.cards.push({
            id: doc.id,
            time: data.posted_at,
            descriptions: data.desc,
            url: data.url,
          });
        });
      });
    },
    postNewImage() {
      const docRef = addDoc(collection(db, "objave"), {
        url: this.newImageUrl,
        desc: this.newImageDescription,
        email: this.store.currentUser,
        posted_at: Date.now(),
      })
        .then((doc) => {
          console.log("Document written with ID: ", doc.id);
          this.newImageDescription = "";
          this.newImageUrl = "";
          this.getPosts();
        })
        .catch((e) => {
          console.error("Error adding document: ", e);
        });
    },
  },

  computed: {
    filterCards() {
      let termin = this.store.searchTerm;
      /* return this.cards.filter(
        (card) => card.descriptions.indexOf(termin) >= 0
      ); */
      let newCards = [];
      for (let card of this.cards) {
        if (card.descriptions.indexOf(termin) >= 0) {
          newCards.push(card);
        }
      }
      return newCards;
    },
    imePrezime() {
      return this.store.ime + " " + store.prezime;
    },
    // sortiranjeMjesta() {
    //   return this.popis.slice().sort(function (a, b) {
    //     return a.mjesto > b.mjesto ? 1 : -1;
    //   });
    // },
    sortZup() {
      const cats = this.popis.reduce((p, c) => {
        p[c.zupanija] = c;
        return p;
      }, {});
      return Object.values(cats).sort((a, b) =>
        a.zupanija.localeCompare(b.zupanija)
      );
    },
    sortMj() {
      const cats = this.popis.reduce((p, c) => {
        p[c.opcina] = c;
        return p;
      }, {});
      return Object.values(cats).sort((a, b) =>
        a.opcina.localeCompare(b.opcina)
      );
    },
  },
  components: {
    InstagramCard,
    StoryCardVue,
  },
};
</script>

<style scoped></style>
