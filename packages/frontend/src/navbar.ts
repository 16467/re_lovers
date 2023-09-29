/*
 * SPDX-FileCopyrightText: syuilo and other misskey, cherrypick contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { computed, defineAsyncComponent, reactive } from 'vue';
import { $i } from '@/account.js';
import { miLocalStorage } from '@/local-storage.js';
import { openInstanceMenu } from '@/ui/_common_/common.js';
import { lookup } from '@/scripts/lookup.js';
import * as os from '@/os.js';
import { i18n } from '@/i18n.js';
import { ui } from '@/config.js';
import { defaultStore } from '@/store.js';
import { unisonReload } from '@/scripts/unison-reload.js';

export const navbarItemDef = reactive({
	notifications: {
		title: i18n.ts.notifications,
		icon: 'ti ti-bell',
		show: computed(() => $i != null),
		indicated: computed(() => $i != null && $i.hasUnreadNotification),
		to: '/my/notifications',
	},
	messaging: {
		title: i18n.ts.messaging,
		icon: 'ti ti-messages',
		show: computed(() => $i != null),
		indicated: computed(() => $i != null && $i.hasUnreadMessagingMessage),
		to: '/my/messaging',
	},
	drive: {
		title: i18n.ts.drive,
		icon: 'ti ti-cloud',
		show: computed(() => $i != null),
		to: '/my/drive',
	},
	followRequests: {
		title: i18n.ts.followRequests,
		icon: 'ti ti-user-plus',
		show: computed(() => $i != null && $i.isLocked),
		indicated: computed(() => $i != null && $i.hasPendingReceivedFollowRequest),
		to: '/my/follow-requests',
	},
	explore: {
		title: i18n.ts.explore,
		icon: 'ti ti-hash',
		to: '/explore',
	},
	announcements: {
		title: i18n.ts.announcements,
		icon: 'ti ti-speakerphone',
		indicated: computed(() => $i != null && $i.hasUnreadAnnouncement),
		to: '/announcements',
	},
	search: {
		title: i18n.ts.search,
		icon: 'ti ti-search',
		to: '/search',
	},
	lookup: {
		title: i18n.ts.lookup,
		icon: 'ti ti-world-search',
		action: (ev) => {
			lookup();
		},
	},
	lists: {
		title: i18n.ts.lists,
		icon: 'ti ti-list',
		show: computed(() => $i != null),
		to: '/my/lists',
	},
	groups: {
		title: i18n.ts.groups,
		icon: 'ti ti-users',
		show: computed(() => $i != null),
		to: '/my/groups',
	},
	antennas: {
		title: i18n.ts.antennas,
		icon: 'ti ti-antenna',
		show: computed(() => $i != null),
		to: '/my/antennas',
	},
	favorites: {
		title: i18n.ts.favorites,
		icon: 'ti ti-star',
		show: computed(() => $i != null),
		to: '/my/favorites',
	},
	pages: {
		title: i18n.ts.pages,
		icon: 'ti ti-news',
		to: '/pages',
	},
	play: {
		title: 'Play',
		icon: 'ti ti-player-play',
		to: '/play',
	},
	gallery: {
		title: i18n.ts.gallery,
		icon: 'ti ti-icons',
		to: '/gallery',
	},
	clips: {
		title: i18n.ts.clip,
		icon: 'ti ti-paperclip',
		show: computed(() => $i != null),
		to: '/my/clips',
	},
	channels: {
		title: i18n.ts.channel,
		icon: 'ti ti-device-tv',
		to: '/channels',
	},
	achievements: {
		title: i18n.ts.achievements,
		icon: 'ti ti-medal',
		show: computed(() => $i != null),
		to: '/my/achievements',
	},
	ui: {
		title: i18n.ts.switchUi,
		icon: 'ti ti-devices',
		action: (ev) => {
			os.popupMenu([{
				text: 'Friendly',
				active: ui === 'friendly' || ui === null,
				action: () => {
					localStorage.setItem('ui', 'friendly');
					unisonReload();
				},
			}, {
				text: 'Misskey',
				active: ui === 'default',
				action: () => {
					miLocalStorage.setItem('ui', 'default');
					unisonReload();
				},
			}, {
				text: i18n.ts.deck,
				active: ui === 'deck',
				action: () => {
					miLocalStorage.setItem('ui', 'deck');
					unisonReload();
				},
			}, {
				text: i18n.ts.classic,
				active: ui === 'classic',
				action: () => {
					miLocalStorage.setItem('ui', 'classic');
					unisonReload();
				},
			}], ev.currentTarget ?? ev.target);
		},
	},
	help: {
		title: i18n.ts.help,
		icon: 'ti ti-help-circle',
		action: (ev) => {
			os.popupMenu([{
				text: i18n.ts.help,
				icon: 'ti ti-help-circle',
				action: () => {
					window.open('https://misskey-hub.net/help.html', '_blank');
				},
			}, {
				type: 'link',
				text: i18n.ts._mfm.cheatSheet,
				icon: 'ti ti-help-circle',
				to: '/mfm-cheat-sheet',
			}, null, {
				type: 'button',
				text: i18n.ts.replayUserSetupDialog,
				icon: 'ti ti-list-numbers',
				action: () => {
					defaultStore.set('accountSetupWizard', 0);
					os.popup(defineAsyncComponent(() => import('@/components/MkUserSetupDialog.vue')), {}, {}, 'closed');
				},
			}, {
				type: 'button',
				text: i18n.ts.replayTutorial,
				icon: 'ti ti-checkup-list',
				action: () => {
					defaultStore.set('timelineTutorial', 0);
					defaultStore.set('tlHomeHintClosed', false);
					defaultStore.set('tlLocalHintClosed', false);
					defaultStore.set('tlMediaHintClosed', false);
					defaultStore.set('tlSocialHintClosed', false);
					defaultStore.set('tlCatHintClosed', false);
					defaultStore.set('tlGlobalHintClosed', false);
					setTimeout(unisonReload, 100);
				},
			}], ev.currentTarget ?? ev.target);
		},
	},
	about: {
		title: i18n.ts.about,
		icon: 'ti ti-info-circle',
		action: (ev) => {
			openInstanceMenu(ev);
		},
	},
	reload: {
		title: i18n.ts.reload,
		icon: 'ti ti-refresh',
		action: (ev) => {
			location.reload();
		},
	},
	profile: {
		title: i18n.ts.profile,
		icon: 'ti ti-user',
		show: computed(() => $i != null),
		to: `/@${$i?.username}`,
	},
});
