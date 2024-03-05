import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showErrorToast, showToast } from '@components/common/Toast';
import messagesAPI from '@/api/messagesAPI';
import { API_MESSAGES } from '@constants/API';

function useDeleteMessageMutation({ messageId }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return messagesAPI.deleteCardMessage(messageId);
    },
    onError: () => {
      showErrorToast(
        '삭제가 제대로 이루어지지 않았어요. 다시 시도해주세요! 🥹',
      );
    },
    onSuccess: () => {
      showToast('성공적으로 메시지카드를 삭제했습니다! 🥳');
      queryClient.invalidateQueries([API_MESSAGES, messageId]);
    },
  });
}

export default useDeleteMessageMutation;
