import { ModalsProvider, useModals, ContextModalProps } from "@mantine/modals";
import { Text, Button, TextInput, MantineProvider } from "@mantine/core";
import React from "react";
const TestModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string }>): any => (
  // TestModal = ({ context, id, innerProps }) => (
  <>
    <Text size="sm">{innerProps.modalBody}</Text>
    <Button fullWidth const mt="md" onClick={() => context.closeModal(id)}>
      Close modal
    </Button>
  </>
);
