<template>
    <!-- ===== KANBAN CONTAINER ===== -->
    <div id="main" class="container-fluid mt-5 d-flex justify-content-center" style="text-align: center;">
        <div class="container-fluid row mt-3 d-flex justify-content-center mb-3">

            <!-- ===== CONTAINER ===== -->
            <div class="col ">
                <div class="card border-primary box" style="max-width: 18rem;">
                    <div class="card-header tag">Back-Log</div>
                        <div class="card-body text-primary overflow-auto">

                            <!-- ===== INPUT ===== -->
                            <div v-if="addData === 'false' && updateData === 'false'">
                                <div class="card border-primary mb-3" v-for="item in tasks" :key="item.id" style="max-width: 15rem;">
                                    <div class="card-header bg-transparent border-primary">{{ item.title }}</div>
                                        <div class="card-body">
                                            <small class="text-muted border-bottom border-primary">Assign To: {{ item.assign_to }} </small>
                                            <p class="card-text">{{ item.description }}</p>
                                            
                                        </div>
                                        <div class="card-footer bg-transparent border-primary">
                                            <div class="btn-group" role="group" v-show="deleteId !== item.id">
                                                <button type="button" class="btn btn-secondary" v-on:click.prevent="isUpdate('true', item.id)" data-toggle="tooltip" data-placement="bottom" title="Edit"><i class="fas fa-pen"></i></button>
                                                <button type="button" class="btn btn-danger" data-toggle="tooltip" v-on:click="isDelete(item.id)" data-placement="bottom" title="Delete"><i class="fas fa-eraser"></i></button>
                                            </div>
                                            <div class="row" id="item.id" v-show="deleteId === item.id">
                                                <label for="">Are You Sure?</label>
                                                <button type="button" class="btn btn-danger" v-on:click="removeData(item.id)">Yes</button>
                                                <button type="button" class="btn btn-warning" v-on:click="isDelete('false')">No</button>
                                            </div>
                                        </div>
                                </div>
                            </div>
                            <!-- ===== END OF INPUT ===== -->
                            <!-- ===== ADD FORM ===== -->
                            <div v-if="addData === 'true'">
                                <div class="card border-danger mb-1" style="max-width: 15rem;">
                                    <form v-on:submit.prevent="addBackLog">
                                        <div class="card-header">
                                            <label for="title">Title</label>
                                            <input type="text" class="form-control" v-model="form_add.title" id="title">
                                        </div>
                                        <div class="card-body">
                                            <label for="assign_to">Assign To</label>
                                            <input type="text" id="assign_to" v-model="form_add.assign_to">
                                            <label for="description">Description</label>
                                            <textarea class="form-control" id="description" v-model="form_add.description" cols="20" rows="8"></textarea>
                                        </div>
                                        <div class="card-footer" id="pop-add">
                                            <button class="btn btn-secondary">Add</button>
                                            <button class="btn btn-warning" v-on:click="isAdd('false')">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <!-- ===== END OF ADD-FORM ===== -->

                            <!-- ===== UPDATE FORM ===== -->
                            <div v-if="updateData === 'true'">
                                <div class="card border-danger mb-1" style="max-width: 15rem;">
                                    <form v-on:submit.prevent="updateBackLog()">
                                        <div class="card-header">
                                            <label for="title">Title</label>
                                            <input type="text" class="form-control" v-model="form_update.title" id="title">
                                        </div>
                                        <div class="card-body">
                                            <label for="assign_to">Assign To</label>
                                            <input type="text" id="assign_to" v-model="form_update.assign_to">
                                            <label for="description">Description</label>
                                            <textarea class="form-control" id="description" v-model="form_update.description" cols="20" rows="8"></textarea>
                                        </div>
                                        <div class="card-footer" id="pop-update">
                                            <button class="btn btn-secondary">Update</button>
                                            <button class="btn btn-warning" v-on:click="isUpdate('false')">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <!-- ===== END OF UPDATE-FORM ===== -->
                        </div>

                        <div class="card-footer" id="add-button" style="min-height: 56px;">
                            <button type="button" class="btn btnAdd" v-show="addData === 'false' " v-on:click="isAdd('true')"><i class="fas fa-plus"></i>  Add New Task</button>
                        </div>
                </div>
            </div>
            <!-- ===== END OF CONTAINER ===== -->
        </div>
    </div>
    <!-- ===== END OF KANBAN ===== -->
</template>

<script>
export default {
    name: "MainPage",
    props: ["tasks", "categories"]
}
</script>

<style>

</style>