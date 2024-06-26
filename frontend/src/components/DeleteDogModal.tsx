import React from 'react';
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
import { useDog } from '@/hooks/useDog';
interface Props {
    id: number;
    name: string;
    setDeleteDogConfirm: (state: boolean) => void;
}
export default function DeleteDogModal({ id, name, setDeleteDogConfirm }: Props) {
    const { deleteDogMutation } = useDog();
    return (
        <div className="fixed">
            <Modal open={true}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle className="text-start">댕댕이 삭제</ModalTitle>
                        <ModalDescription className="text-start">
                            {name}를(을) 나의 댕댕이에서 삭제할까요?
                        </ModalDescription>
                    </ModalHeader>
                    <ModalFooter>
                        <ModalCancel onClick={() => setDeleteDogConfirm(false)}>취소</ModalCancel>
                        <ModalAction onClick={() => deleteDogMutation.mutate(id)}>삭제하기</ModalAction>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
