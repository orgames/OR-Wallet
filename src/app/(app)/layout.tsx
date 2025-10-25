'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  Wallet,
  LayoutDashboard,
  Send,
  Award,
  LogOut,
  ArrowRightLeft,
  Upload,
} from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth, useUser, useFirestore, useFirebaseApp } from '@/firebase';
import { signOut } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');
  const { user, loading, error, reload } = useUser();
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const app = useFirebaseApp();
  const { toast } = useToast();

  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      router.push('/login');
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const resetDialog = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  const handleDialogStateChange = (open: boolean) => {
    setIsProfileDialogOpen(open);
    if (!open) {
      resetDialog();
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !user || !app) return;

    setIsUploading(true);
    const storage = getStorage(app);
    const storageRef = ref(storage, `profile-pictures/${user.uid}/${selectedFile.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      if (firestore) {
          const userDocRef = doc(firestore, 'users', user.uid);
          await updateDoc(userDocRef, {
            photoURL: downloadURL,
          });
      }

      // Manually trigger a refresh of the user object to get the new photoURL
      if (user.reload) {
        await user.reload();
      }
      // Call the reload function from the useUser hook to update the state
      reload();


      toast({
        title: 'Success',
        description: 'Profile picture updated successfully.',
      });
      handleDialogStateChange(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: 'There was an error uploading your profile picture.',
      });
    } finally {
      setIsUploading(false);
    }
  };


  const navItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/send-money', label: 'Send Money', icon: Send },
    { href: '/rewards', label: 'Earn Rewards', icon: Award },
    { href: '/convert', label: 'Convert', icon: ArrowRightLeft },
  ];

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Wallet className="h-12 w-12 animate-pulse" />
          <p className="text-muted-foreground">Loading your wallet...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-2 p-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-sidebar-foreground"
            >
              <Wallet className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-sidebar-foreground">
              OR Wallet
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t border-sidebar-border p-2">
          {/* Footer content can go here if needed */}
        </SidebarFooter>
      </Sidebar>
      <div className="flex min-h-svh flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:justify-end sm:px-6">
          <SidebarTrigger className="sm:hidden" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative flex h-8 w-8 items-center gap-2 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  {user.photoURL ? (
                    <AvatarImage
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                    />
                  ) : (
                    userAvatar && (
                      <AvatarImage
                        src={userAvatar.imageUrl}
                        alt={user.displayName || ''}
                        data-ai-hint={userAvatar.imageHint}
                      />
                    )
                  )}
                  <AvatarFallback>
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.displayName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setIsProfileDialogOpen(true)}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <SidebarInset>{children}</SidebarInset>
      </div>
      <Dialog open={isProfileDialogOpen} onOpenChange={handleDialogStateChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Profile Picture</DialogTitle>
            <DialogDescription>
              Select an image file to set as your new profile picture.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="picture" className="text-right">
                Picture
              </Label>
              <Input
                id="picture"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="col-span-3"
                accept="image/*"
              />
            </div>
             {previewUrl && (
              <div className="col-span-4 flex justify-center">
                <Image
                  src={previewUrl}
                  alt="Profile preview"
                  width={128}
                  height={128}
                  className="h-32 w-32 rounded-full object-cover"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload'}
               <Upload className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
