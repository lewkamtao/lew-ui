// 通用
import LewAvatar from './components/general/LewAvatar.vue';
import LewButton from './components/general/LewButton.vue';
import LewBadge from './components/general/LewBadge.vue';
import LewTitle from './components/general/LewTitle.vue';

// 表单
import LewFormItem from './components/form/LewFormItem.vue';
import LewInput from './components/form/LewInput.vue';
import LewSelect from './components/form/LewSelect.vue';
import LewSwitch from './components/form/LewSwitch.vue';
import LewTextarea from './components/form/LewTextarea.vue';
import LewCheckbox from './components/form/LewCheckbox.vue';
import LewCheckboxGroup from './components/form/LewCheckboxGroup.vue';
import LewRadiobox from './components/form/LewRadio.vue';
import LewRadioboxGroup from './components/form/LewRadioGroup.vue';
import LewTabs from './components/form/LewTabs.vue';

// 反馈
import LewAlert from './components/feedback/LewAlert/LewAlert.vue';
import LewModal from './components/feedback/LewModal/LewModal.vue';
import LewPopover from './components/feedback/LewPopover/LewPopover.vue';
import LewPopok from './components/feedback/LewPopok/LewPopok.vue';

import LewTooltips from './components/feedback/LewTooptips';
import LewDialog from './components/feedback/LewDialog';
import LewMessage from './components/feedback/LewMessage';

// 其他
import LewFancybox from './components/other/LewFancybox';
import LewFancyImg from './components/other/LewFancybox/LewFancyImg.vue';
import LewPlyrVideo from './components/other/LewPlyrVideo/LewPlyrVideo.vue';

// 引入样式
import './styles/reset.scss';
import './styles/main.scss';
import './styles/var.scss';

// fancybox
import '@fancyapps/ui/dist/fancybox.css';
// plyr
import 'plyr/dist/plyr.css';

export {
    LewAvatar,
    LewButton,
    LewFormItem,
    LewInput,
    LewSelect,
    LewSwitch,
    LewTitle,
    LewTabs,
    LewBadge,
    LewTextarea,
    LewCheckbox,
    LewCheckboxGroup,
    LewRadiobox,
    LewRadioboxGroup,
    LewAlert,
    LewModal,
    LewTooltips,
    LewDialog,
    LewMessage,
    LewPopover,
    LewPopok,
    LewFancybox,
    LewFancyImg,
    LewPlyrVideo,
};
