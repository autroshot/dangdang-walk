import { JournalDetail, remove as removeJournal, update as updateJournal } from '@/api/journals';
import { deleteImages, getUploadUrl, uploadImage } from '@/api/upload';
import { ReactComponent as Arrow } from '@/assets/icons/ic-arrow.svg';
import { ReactComponent as Meatball } from '@/assets/icons/ic-meatball.svg';
import BottomSheet from '@/components/common/BottomSheet';
import { Button } from '@/components/common/Button';
import { Divider } from '@/components/common/Divider';
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
import CompanionDogSection, { Dog } from '@/components/journals/CompanionDogSection2';
import Heading from '@/components/journals/Heading';
import MemoSection from '@/components/journals/MemoSection';
import Navbar from '@/components/journals/Navbar';
import PhotoSection from '@/components/journals/PhotoSection';
import Map from '@/components/walk/Map';
import WalkInfo from '@/components/walk/WalkInfo';
import useToast from '@/hooks/useToast';
import { useSpinnerStore } from '@/store/spinnerStore';
import { getFileName } from '@/utils/url';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

export default function Detail() {
    const journalDetail = useLoaderData() as JournalDetail;
    const { journalInfo, dogs: dogsFromAPI, excrements = [] } = journalDetail;
    const { id: journalId, routes, memo, photoUrls: photoFileNames } = journalInfo;

    const navigate = useNavigate();
    const location = useLocation();
    const { show: showToast } = useToast();

    const addSpinner = useSpinnerStore((state) => state.spinnerAdd);
    const removeSpinner = useSpinnerStore((state) => state.spinnerRemove);

    const [openModal, setOpenModal] = useState(false);
    const [isBottomsheetOpen, setIsBottomsheetOpen] = useState(false);
    const [imageFileNames, setImageFileNames] = useState<Array<ImageFileName>>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isModifying, setIsModifying] = useState(false);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const receivedState =
        (location.state as ReceivedState) ??
        ({
            dogName: '골댕이',
            startedAt: '1718-03-30 12:32:08',
            journalCnt: 1,
            calories: 20,
            distance: 30,
            duration: 131,
        } as ReceivedState);

    const { dogName, journalCnt: journalCount, calories, duration, distance } = receivedState;

    const dogs: Array<Dog> = dogsFromAPI.map((dog) => {
        const foundExcrement = excrements.find((excrement) => excrement.dogId === dog.id);
        const fecesCount = foundExcrement?.fecesCnt ?? 0;
        const urineCount = foundExcrement?.urineCnt ?? 0;

        return { ...dog, fecesCount, urineCount };
    });

    useEffect(() => {
        dogs.forEach((dog) => {
            if (!dog.profilePhotoUrl) return;
            dog.profilePhotoUrl = getFileName(dog.profilePhotoUrl);
        });

        setImageFileNames(photoFileNames);
    }, [location]);

    useEffect(() => {
        if (textAreaRef.current === null) return;
        textAreaRef.current.value = memo;
    }, []);

    return (
        <>
            <div className="flex flex-col">
                <div className="flex justify-between items-center h-12 px-5">
                    <button className="w-12 h-12 flex justify-center items-center" onClick={handleGoBack}>
                        <Arrow className="rotate-180" />
                    </button>
                    <Heading headingNumber={1} className="-translate-x-[15px]">
                        {dogName}의 {journalCount}번째 산책
                    </Heading>
                    <button
                        className="w-12 h-12 flex justify-center items-center"
                        onClick={() => setIsBottomsheetOpen(true)}
                    >
                        <Meatball />
                    </button>
                </div>
                <div className={`h-[calc(100dvh-3rem-4rem)] overflow-y-auto`}>
                    <Map
                        startPosition={routes[0]}
                        path={routes}
                        className="rounded-lg overflow-hidden"
                        height="216px"
                    />
                    <WalkInfo distance={distance} calories={calories} duration={duration} />
                    <Divider />
                    <CompanionDogSection dogs={dogs} />
                    <Divider />
                    <PhotoSection
                        imageFileNames={imageFileNames}
                        isLoading={isUploading}
                        isModifying={isModifying}
                        onChange={handleAddImages}
                        onDeleteImage={handleDeleteImage}
                    />
                    <Divider />
                    <MemoSection textAreaRef={textAreaRef} readonly={!isModifying} />
                </div>
                {isModifying ? (
                    <Button rounded="none" className="w-full h-16" disabled={isSaving} onClick={handleSave}>
                        <span className="-translate-y-[5px]">저장하기</span>
                    </Button>
                ) : (
                    <Navbar />
                )}
            </div>
            <Modal open={openModal}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>산책기록 삭제</ModalTitle>
                        <ModalDescription>산책기록을 삭제하시겠어요?</ModalDescription>
                    </ModalHeader>
                    <ModalFooter>
                        <ModalCancel onClick={() => setOpenModal(false)}>취소</ModalCancel>
                        <ModalAction onClick={handleCancelSave}>삭제하기</ModalAction>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <BottomSheet isOpen={isBottomsheetOpen} onClose={() => setIsBottomsheetOpen(false)}>
                <BottomSheet.Body className="h-auto px-0 overflow-y-visible">
                    <Divider className="h-px" />
                    <Button
                        rounded="none"
                        className="w-full bg-white text-[#222222] text-base font-normal"
                        onClick={handleModify}
                    >
                        수정하기
                    </Button>
                    <Divider className="h-px" />
                    <Button
                        rounded="none"
                        className="w-full bg-white text-[#222222] text-base font-normal"
                        onClick={() => setOpenModal(true)}
                    >
                        삭제하기
                    </Button>
                </BottomSheet.Body>
                <BottomSheet.ConfirmButton onConfirm={() => setIsBottomsheetOpen(false)} disabled={false}>
                    취소
                </BottomSheet.ConfirmButton>
            </BottomSheet>
        </>
    );

    async function handleSave() {
        setIsSaving(true);
        addSpinner();

        const memo = textAreaRef.current?.value ?? '';
        const photoUrls = imageFileNames;
        await updateJournal(journalId, { memo, photoUrls });

        setIsSaving(false);
        removeSpinner();
        showToast('산책 기록이 저장되었습니다.');

        navigate(-1);
    }

    async function handleCancelSave() {
        await removeJournal(journalId);

        showToast('산책 기록이 삭제되었습니다.');

        navigate(-1);
    }

    async function handleAddImages(e: FormEvent<HTMLInputElement>) {
        const files = e.currentTarget.files;

        if (files === null) return;
        setIsUploading(true);

        const fileTypes = Array.from(files).map((file) => file.type);
        const uploadUrlResponses = await getUploadUrl(fileTypes);
        const uploadUrls = uploadUrlResponses.map((uploadUrlResponse) => uploadUrlResponse.url);

        const uploadImagePromises = uploadUrls.map((uploadUrl, index) => {
            return uploadImage(files[index]!, uploadUrl);
        });
        await Promise.allSettled(uploadImagePromises);

        const filenames = uploadUrlResponses.map((uploadUrlResponse) => uploadUrlResponse.filename);
        setImageFileNames((prevImageFileNames) => [...prevImageFileNames, ...filenames]);
        setIsUploading(false);
    }

    async function handleDeleteImage(imageFileName: ImageFileName) {
        await deleteImages([imageFileName]);

        setImageFileNames((prevImageFileNames) =>
            prevImageFileNames.filter((prevImageFileName) => prevImageFileName !== imageFileName)
        );
        showToast('사진이 삭제되었습니다.');
    }

    function handleGoBack() {
        navigate(-1);
    }

    function handleModify() {
        setIsModifying(true);
        setIsBottomsheetOpen(false);
    }
}

interface ReceivedState {
    dogName: string;
    journalCnt: number;
    startedAt: string;
    calories: number;
    duration: number;
    distance: number;
}

export type ImageFileName = string;
