<script lang="ts">
import { onMounted, ref, h } from 'vue';

interface Props {
  src: string;
  title: string;
  height: number,
  width: number,
}

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      default: () => 24,
    },
    width: {
      type: Number,
      default: () => 24,
    },
  },
  setup(props: Props) {
    const svgInnerHTML = ref('');
    const viewBox = ref<string>(`0 0 ${props.width} ${props.height}`);

    const importSvgContent = async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const svgRaw = (await import(`${props.src}?raw`)).default as string;
      const parser = new DOMParser();
      const svgDocument = parser.parseFromString(svgRaw, 'text/html');
      const svgNode = svgDocument.querySelector('svg');
      if (svgNode) {
        svgInnerHTML.value = svgNode.innerHTML;
      }
    };

    onMounted(async () => {
      await importSvgContent();
    });

    return () => h('i', {
      style: {
        height: `${props.height}px`,
        width: `${props.width}px`,
      },
    }, [
      h('svg', {
        viewBox: viewBox.value,
        height: `${props.height}px`,
        width: `${props.width}px`,
        innerHTML: svgInnerHTML.value,
      }),
    ]);
  },
};
</script>
