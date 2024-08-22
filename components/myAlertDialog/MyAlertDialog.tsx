"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React from "react";
import MyButton from "../myButton/MyButton";

import styles from "./MyAlertDialog.module.css";

type Props = {
  trigger: React.ReactNode;
  title: string;
  confirmHandler: () => void;
};

const MyAlertDialog = ({ trigger, title, confirmHandler }: Props) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.AlertDialogOverlay} />
        <AlertDialog.Content className={styles.AlertDialogContent}>
          <AlertDialog.Title className={styles.AlertDialogTitle}>
            {title}
          </AlertDialog.Title>
          <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
            <AlertDialog.Cancel asChild>
              <MyButton text="cancle" />
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <MyButton
                text="ok"
                theme="dangerous"
                onClick={() => confirmHandler()}
              />
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default MyAlertDialog;
