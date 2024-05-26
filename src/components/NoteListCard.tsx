"use client";
import { Notes } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import Link from "next/link";

interface NoteListCardProps {
  note: Notes;
}

export default function NoteListCard({
  note: { title, socialMediaUrl, writerName, description, category },
}: NoteListCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="hover:bg-muted/60 cursor-pointer">
          <CardHeader>
            <CardTitle className="text-xl">
              {title ? `${title.slice(0, 25)}...` : "No description available"}
              </CardTitle>
            <CardDescription>
              {description ? `${description.slice(0, 100)}...` : "No description available"}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {socialMediaUrl ? (
                <Link href={socialMediaUrl} className="text-blue-500 hover:underline">
                  {writerName}
                </Link>
              ) : (
                <span>{writerName}</span>
              )}
            </div>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
          <DialogDescription>
            {description || "No description available"}
          </DialogDescription>
        <DialogFooter>
          <div className="flex items-center space-x-4 text-xs">
                {socialMediaUrl ? (
                  <Link href={socialMediaUrl} className="text-blue-500 hover:underline">
                    {writerName}
                  </Link>
                ) : (
                  <span>{writerName}</span>
                )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}