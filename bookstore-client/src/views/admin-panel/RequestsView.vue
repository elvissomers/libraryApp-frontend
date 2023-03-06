<template>
    <div class="Requests">
      <SideBar></SideBar>
      <ManageRequests></ManageRequests>
  
    </div>
</template>
  
<script>
    // @ is an alias to /src
    import ManageRequests from '@/components/admin-panel/ManageRequests.vue';
    import SideBar from '@/components/SideBar.vue';
    
    export default {
        name: 'RequestsView',
        components: {
        SideBar,
        ManageRequests
        }
    }   
</script>
  
  <style>
  .Requests {
  display: flex;
  flex-wrap: nowrap;
  
  }
  </style>