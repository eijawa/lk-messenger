<template>
  <div
    v-if="isMinified"
    class="attachment minified"
    :class="colorClassName"
  >
    <font-awesome-icon :icon="['fas', iconName]" size="sm" />
    <span>{{ upperCasedType }}</span>
  </div>
</template>

<script setup>
import { getAttachmentInfo } from '@/helpers/attachmentHelper';

const props = defineProps({
  attachmentSrc: {
    type: String,
    required: true,
    default: '',
  },
  isMinified: {
    type: Boolean,
    default: false,
  },
});

const mapAttachmentFileTypeToLocale = {
  '/png|jpg|jpeg|webp|gif|bmp|ico|tiff': 'img',
  '/doc|docx/': 'doc',
  '/ppt|pptx|odp|ppt|pps/': 'ppt',
  '/xls|xlsx/': 'xls',
  '/zip|rar|7z|tar|gz/': 'zip',
};

const attachment = getAttachmentInfo(props.attachmentSrc);

let localedType = attachment.fileType;
// eslint-disable-next-line no-restricted-syntax
for (const [key, value] of Object.entries(mapAttachmentFileTypeToLocale)) {
  if (key.indexOf(attachment.fileType) !== -1) {
    localedType = value;
    break;
  }
}

const mapAttachmentTypeToIcon = {
  'img': 'file-image',
  'pdf': 'file-pdf',
  'doc': 'file-word',
  'ppt': 'file-powerpoint',
  'xls': 'file-excel',
  'zip': 'file-zipper',
  'txt': 'file-lines',
};

const iconName = mapAttachmentTypeToIcon[localedType] ?? 'file';

const colorClassName = `atta-color-${localedType}`;
const upperCasedType = attachment.fileType.toUpperCase();
</script>

<style lang="scss" scoped>
@use 'sass:color';

$colors: (
  "img": #ffd264,
  "pdf": #ff5a5f,
  "doc": #419bd2,
  "ppt": #f06e4b,
  "xls": #a0c382,
  "zip": #e1e6e6,
  "txt": #96c3d7
);

@each $type, $color in $colors {
  .atta-color-#{$type} {
    border-color: $color;

    background-color: color.adjust($color, $lightness: +20%);

    color: color.adjust($color, $lightness: -20%);
  }
}

.attachment {
  padding: 0 0.25rem;

  display: flex;
  place-items: center;
  column-gap: 0.25rem;

  border-width: 1px;
  border-style: solid;
  border-radius: 4px;

  &.minified {
    pointer-events: none;
    user-select: none;
  }
}
</style>
