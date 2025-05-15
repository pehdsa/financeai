"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/app/_components/ui/dialog";
import React, { useState } from "react";
import { generateAiReport } from "../_actions/generate-ai-report";
import Markdown from "react-markdown";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Loader2Icon } from "lucide-react";

interface AiReportButtonProps {
  month: string;
}

export const AiReportButton = ({ month }: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateReport = async () => {
    try {
      setIsLoading(true);
      const aiReport = await generateAiReport({ month });
      setReport(aiReport);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Relatório IA</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[600px]">
        <DialogHeader>
          <DialogTitle>Relatório IA</DialogTitle>
          <DialogDescription>
            Use inteligência artificial para gerar relatórios com insights sobre
            suas finaças
          </DialogDescription>
        </DialogHeader>
        {!!report && (
          <ScrollArea className="prose prose-h3:text-white prose-h4:text-white prose-strong:text-white max-h-[450px] text-white">
            <Markdown>{report}</Markdown>
          </ScrollArea>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleGenerateReport} disabled={isLoading}>
            {isLoading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Gerar relatório"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
