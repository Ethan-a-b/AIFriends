<script setup>
defineProps(['character'])
</script>

<template>
  <div class="chat-avatar-bar">
    <div class="avatar-wrapper">
      <img :src="character.photo" alt="avatar" class="avatar-img" />
      <span class="status-dot"></span>
    </div>

    <div class="info">
      <div class="name">{{ character.name }}</div>
      <div class="sub">AI 角色 · 在线</div>
    </div>

    <div class="action">
      <button class="icon-btn" title="返回">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.chat-avatar-bar {
  position: absolute;
  left: 16px;
  top: 24px;
  max-width: calc(100% - 32px);
  height: 48px;
  padding: 0 14px 0 8px;
  border-radius: 999px;

  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  z-index: 20;
}

.avatar-wrapper {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(13deg, #667eea 20%, #764ba2 100%);
  flex-shrink: 0;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(0, 0, 0, 0.4);
}

.status-dot {
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid rgba(0, 0, 0, 0.6);
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  flex: 1;
}

.name {
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
}

.sub {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.2;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.action {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.icon-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
}

.icon-btn:hover {
  background: rgba(255, 255, 255, 0.22);
  transform: scale(1.05);
}

.icon-btn svg {
  width: 18px;
  height: 18px;
}
</style>
