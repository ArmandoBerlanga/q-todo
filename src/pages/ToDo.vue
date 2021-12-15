<template>
<q-page :id="darkmode ? 'contenedor' : ''" class="page">

    <q-section :class="darkmode ? 'row q-pa-sm bg-negative' : 'row q-pa-sm bg-primary'">
        <q-input v-model="state.newTask" placeholder="Add Task" class="col bkg-white" dense square filled>
            <template v-slot:append>
                <q-btn round dense flat icon="add" clickable @click="addTask" @keyup.capture="addTask" />
            </template>
        </q-input>
    </q-section>

    <q-list :id="darkmode ? 'q-detail' : ''" class="lista bkg-white" separator bordered>
        <q-item v-for="task in state.tasks" :key="task.id" @click="task.completed = !task.completed" :id="darkmode ? 'q-item' : ''" :class="{ 'completed' : task.completed }" clickable v-ripple>
            <q-item-section avatar>
                <q-checkbox class="no-pointer-events" :color="darkmode ? 'negative' : 'primary'" v-model="task.completed" />
            </q-item-section>

            <q-item-section class="name">
                <q-item-label>{{ task.name }}</q-item-label>
            </q-item-section>

            <q-item-section side v-if="task.completed">
                <q-btn flat :color="darkmode ? 'negative' : 'primary'" icon="delete" :id="darkmode ? 'q-detail' : ''" class="bkg-white" @click.stop="deleteTask(task.id)" />
            </q-item-section>
        </q-item>
    </q-list>

    <div class="no-tasks absolute-center info" v-if="state.tasks.length == 0">
        <q-icon name="sentiment_dissatisfied" :class="darkmode ? 'text-negative' : 'text-primary'" style="font-size: 3em;" />
        <span :class="darkmode ? 'text-h5 text-center text-negative' : 'text-h5 text-center text-primary'">No Tasks</span>
    </div>

</q-page>
</template>

<script>
import {
    defineComponent,
    reactive
} from 'vue'
import {
    useQuasar
} from 'quasar'

export default defineComponent({
    name: 'ToDo',
    props: {
        darkmode: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const $q = useQuasar();

        const state = reactive({
            newTask: '',
            tasks: []
        });

        function addTask() {

            if (state.newTask.trim() == '') {
                $q.notify({
                    message: 'Please enter a task name',
                    color: props.darkmode ? 'negative' : 'primary'
                });
                return;
            }

            state.tasks.push({
                id: state.tasks.length + 1,
                name: state.newTask,
                completed: false
            });
            state.newTask = '';
            $q.notify({
                message: 'Task Added',
                color: props.darkmode ? 'negative' : 'primary'
            })
        }

        function deleteTask(id) {
            $q.dialog({
                title: 'Confirm',
                message: 'Really delete this task?',
                color: props.darkmode ? 'negative' : 'primary',
                cancel: true,
                persistent: true
            }).onOk(() => {
                state.tasks = state.tasks.filter(task => task.id !== id);
                $q.notify({
                    message: 'Task deleted',
                    color: props.darkmode ? 'negative' : 'primary'
                })
            })
        }

        return {
            state,
            addTask,
            deleteTask
        }

    }
})
</script>

<style lang="scss">
.page {
    background-color: rgba(190, 187, 187, 0.336);
}

.bkg-white {
    background-color: white;
}

.add-task {
    // background-color: #ff5964a8;
    background-color: #e68693;

}

.completed {

    color: gray;
    background-color: #ff596428;

    .name {
        text-decoration: line-through;
    }
}

.info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
</style>
