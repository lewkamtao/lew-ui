import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'LewUploadDragger',
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    emits: ['dragFiles'],
    setup(props, { slots, emit }) {
        const draggerRef = ref<HTMLDivElement>();

        function handleDrop(event: DragEvent) {
            if (props.disabled) return;
            event.preventDefault();
            const files = event.dataTransfer?.files || [];
            const fileList = Array.from(files);
            emit('dragFiles', fileList);
        }

        function handleDragleave() {
            if (props.disabled) return;
            draggerRef.value?.classList.remove('is-dragover');
        }

        function handleDragover(event: DragEvent) {
            if (props.disabled) return;
            draggerRef.value?.classList.add('is-dragover');
            event.preventDefault();
        }

        // 渲染默认插槽
        function renderDefaultSlot() {
            return slots.default ? slots.default() : null;
        }

        return () => (
            <>
                <div
                    ref={draggerRef}
                    class="lew-upload-dragger"
                    onDrop={handleDrop}
                    onDragover={handleDragover}
                    onDragleave={handleDragleave}
                >
                    {renderDefaultSlot()}
                </div>
            </>
        );
    }
});
