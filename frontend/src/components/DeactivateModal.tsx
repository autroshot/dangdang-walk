import {
    Modal,
    ModalAction,
    ModalCancel,
    ModalContent,
    ModalDescription,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from '@/components/common/Modal';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';

export default function DeactivateModal({ setDeactivate }: { setDeactivate: (state: boolean) => void }) {
    const { deactivateMutation } = useAuth();
    return (
        <div className="fixed">
            <Modal open={true}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>회원 탈퇴</ModalTitle>
                        <ModalDescription>정말 회원 탈퇴를 진행하시겠습니까?</ModalDescription>
                    </ModalHeader>
                    <ModalFooter>
                        <ModalCancel onClick={() => setDeactivate(false)}>취소</ModalCancel>
                        <ModalAction onClick={() => deactivateMutation.mutate(null)}>탈퇴하기</ModalAction>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
