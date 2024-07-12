import { IconX } from '@tabler/icons-react';
import { FC, RefObject, memo, useEffect, useRef, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { NEXT_PUBLIC_COMMENT_MAX_LENGTH } from '@/utils/app/const';

import { Conversation } from '@/types/chat';
import { FeedbackOption } from '@/types/feedback';

import axios from 'axios';
import { measureMemory } from 'vm';
import { Message } from 'postcss';

interface Props {
  onClose: () => void;
  selectedConversation?: Conversation;
  messageIndex: number;
  handleShowFeedbackForm?: () => void;
}

const feedbackOptions: FeedbackOption[] = [
  { displayName: "Don't like the style", name: 'bad-style' },
  { displayName: 'Not factually correct', name: 'incorrect' },
  {
    displayName: "Didn't fully follow instructions",
    name: 'not-following-instructions',
  },
  { displayName: "Refused when it shouldn't have", name: 'improper-refusal' },
  { displayName: 'Being lazy', name: 'laziness' },
  { displayName: 'Unsafe or problematic', name: 'unsafe-problematic' },
  { displayName: 'More...', name: 'more' },
  { displayName: 'Other', name: 'other' },
];

export const FeedbackForm: FC<Props> = memo(
  ({ onClose, selectedConversation, messageIndex, handleShowFeedbackForm }) => {
    const { t } = useTranslation('chat');
    const maxLength = NEXT_PUBLIC_COMMENT_MAX_LENGTH;

    const [moreSelected, setMoreSelected] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [comment, setComment] = useState<string>('');

    const selfRef = useRef<HTMLDivElement>(null);
    const commentField = useRef<HTMLInputElement>(null);

    const handleSelectMore = () => {
      setMoreSelected(true);
    };

    const handleUpdateComment = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (maxLength && value.length > maxLength) {
        alert(
          t(
            `Comment limit is {{maxLength}} characters. You have entered {{valueLength}} characters.`,
            { maxLength, valueLength: value.length },
          ),
        );
      } else {
        setComment(value);
      }
    };

    const handleSubmit = (tag: string, userComment: string) => {
      const finalTag: string | undefined = tag ? tag : undefined;
      const finalComment: string | undefined = userComment
        ? userComment
        : undefined;

      console.log(finalTag, finalComment);

      if (selectedConversation != null) {
        axios
          .post('http://127.0.0.1:5000/api/feedback-detail', {
            conversationId: selectedConversation.id,
            index: messageIndex,
            feedback: finalTag,
            comment: finalComment,
          })
          .then((response) => {
            console.log('Detailed feedback sent:', response.data);
          })
          .catch((error) => {
            console.error('Error sending detailed feedback:', error);
          });
      }

      onClose();
    };

    const handleSelectOption = (e: React.MouseEvent<HTMLButtonElement>) => {
      const selectedName: string = e.currentTarget.name;

      setSelectedOption(selectedOption === selectedName ? '' : selectedName);

      if (!moreSelected) {
        handleSubmit(selectedName, comment);
      }
    };

    const handleSubmitVerification = () => {
      if (
        comment.length <= maxLength &&
        (0 < selectedOption.length || 0 < comment.length)
      ) {
        handleSubmit(selectedOption, comment);
      } else if (comment.length > maxLength) {
        alert(
          t(
            `Please shorten your comment. Comment limit is {{maxLength}} characters. You have entered {{valueLength}} characters.`,
            { maxLength, valueLength: comment.length },
          ),
        );
      } else {
        alert(
          'Please select a reason or enter a comment for this bad response',
        );
      }
    };

    useEffect(() => {
      if (moreSelected && commentField.current) {
        commentField.current.focus();
      }
    }, [moreSelected]);

    useEffect(() => {
      if (moreSelected && handleShowFeedbackForm) {
        handleShowFeedbackForm();
      }
    }, [moreSelected, handleShowFeedbackForm]);

    return (
      <div
        className="w-full rounded-md border border-gray-400 flex flex-col px-4 py-4 gap-2 text-gray-400 text-[14px]"
        ref={selfRef}
      >
        <div className="flex flex-row justify-between">
          <p className="m-0">Tell us more:</p>
          <button className="hover:text-gray-200" onClick={onClose}>
            <IconX size={20} />
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {feedbackOptions.map((option, index) => {
            const showButton: boolean = !(
              (option.name === 'more' && moreSelected) ||
              (option.name === 'other' && !moreSelected)
            );

            return (
              showButton && (
                <button
                  key={index}
                  name={option.name}
                  className={`${
                    option.name === selectedOption
                      ? 'border-gray-100 bg-gray-100 text-gray-900'
                      : 'border-gray-400 transition-colors duration-200 hover:bg-gray-600'
                  } border rounded-md px-3 py-0.5`}
                  onClick={
                    option.name === 'more'
                      ? handleSelectMore
                      : handleSelectOption
                  }
                >
                  {option.displayName}
                </button>
              )
            );
          })}
        </div>
        {moreSelected && (
          <div className="md:mt-4 flex flex-row gap-4">
            <input
              className="rounded-md border border-gray-400 px-4 py-2 placeholder-gray-400 text-gray-200 bg-transparent flex-grow"
              placeholder="(Optional) Add a comment..."
              onChange={handleUpdateComment}
              value={comment}
              ref={commentField}
            ></input>
            <button
              className="rounded-md border border-gray-400 px-4 py-2 text-gray-200 duration-200 hover:bg-gray-600 min-w-max"
              onClick={handleSubmitVerification}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    );
  },
);
FeedbackForm.displayName = 'FeedbackForm';