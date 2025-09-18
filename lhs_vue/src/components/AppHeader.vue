<template>
  <div id="wrapper">
    <header>
      <div class="container">
        <nav class="nav-container">
          <div class="item">
            <span>
              <img src="@/assets/bed.png" height="17" width="22" alt=""/>
              hotels
            </span>
          </div>
          <div class="item">
            <div class="flex vertical-center">
              <img src="@/assets/heart.png" height="19" width="20" alt=""/>
              <span>
                찜하기
              </span>
              |
              <div class="circle">
                <div class="mini-circle">
                  <div class="check"></div>
                </div>
              </div>
              <span>
                Tomhoon
              </span>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <main>
    </main>


  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
header {
  margin-bottom: 40px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  width: 100%;
  margin: 0 auto;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  background-color: #FFFFFF;
  padding: 0 105px;
  height: 87px;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.item span {
  display: flex;
  gap: 4px;
}

.circle {
  width: 45px;
  height: 45px;
  background-color: #D9D9D9;
  border: 1px solid #000000;
  border-radius: 50%;
  position: relative;
}

.mini-circle {
  position: absolute;
  background-color: #FF8682;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  top: 33px;
  right: 1px;
}

.check {
  width: 6px;
  height: 3px;
  border-left: 2px solid black;
  border-bottom: 2px solid black;
  transform: rotate(-45deg);
  position: absolute;
  top: 2px;
  left: 2px;
}

.flex {
  display: flex;
  gap: 10px;
}

.vertical-center {
  align-items: center;
}

img {
  object-fit: contain;
}


</style>