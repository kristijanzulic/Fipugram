<template>
  <!-- navigacija -->
  <div id="app">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" v-if="!store.currentUser" href="#">
          <img
            src="@/assets/logoig.png"
            alt=""
            width="50"
            height="50"
            class="d-inline-block align-text-top"
          />
          Fipugram
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/Login"
                v-if="!store.currentUser"
                class="nav-link"
                >Prijava</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                to="/Signup"
                v-if="!store.currentUser"
                class="nav-link"
                >Registracija</router-link
              >
            </li>
            <li class="nav-item">
              <a
                href="#"
                @click.prevent="logout"
                v-if="store.currentUser"
                class="nav-link"
                >Logout</a
              >
            </li>
            <li class="nav-item">
           <router-link to="/select" >select</router-link>            
          </li>
          </ul>
          <form class="d-flex justify-content-end" role="search">
            <input
              v-model="store.searchTerm"
              class="form-control me-2"
              type="search"
              placeholder="Pretraga"
              aria-label="Search"
            />
          </form>
        </div>
      </div>
    </nav>
    <router-view />

    <!-- Footer -->
    <footer class="text-center text-white">
      <!-- Grid container -->
      <div class="container p-4">
        <!-- Section: Social media -->
        <section class="mb-4">
          <div class="row">
            <div class="home col-2">
              <img
                src="@/assets/home.png"
                alt=""
                width="50"
                height="50"
                class="d-inline-block align-text-top"
              />
            </div>
            <div class="search col-2">
              <img
                src="@/assets/search.png"
                alt=""
                width="50"
                height="50"
                class="d-inline-block align-text-top"
              />
            </div>
            <div class="reels col-2">
              <img
                src="@/assets/reels.png"
                alt=""
                width="50"
                height="50"
                class="d-inline-block align-text-top"
              />
            </div>
            <div class="shop col-2">
              <img
                src="@/assets/shop.png"
                alt=""
                width="50"
                height="50"
                class="d-inline-block align-text-top"
              />
            </div>
            <div class="profile col-2">
              <img
                src="@/assets/avatar.png"
                alt=""
                width="50"
                height="50"
                class="d-inline-block align-text-top"
              />
            </div>
          </div>
        </section>
      </div>
    </footer>
    <!-- Footer -->
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import store from "@/store";
import { getAuth, onAuthStateChanged, signOut } from "@/firebase";
import router from "./router";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  const currentRoute = router.currentRoute;

  if (user) {
    store.currentUser = user.email;
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User

    if (!currentRoute.meta.needsUser) {
      router.push({ name: "home" });
    }
    const uid = user.uid;

    // ...
  } else {
    // User is signed out
    // ...
    store.currentUser = null;
    console.log("odjavljen");

    if (currentRoute.meta.needsUser) {
      router.push({ name: "login" });
    }
  }
});

export default {
  name: "app",
  data() {
    return { store: store };
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("odjavio si se");
          this.$router.push({ name: "login" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: {},
};
</script>
