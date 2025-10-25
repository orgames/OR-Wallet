'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Copy, MoreVertical, Trash2, Globe, KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type ApiKey = {
  key: string;
  label: string;
  active: boolean;
  createdAt: string;
  lastUsed: string;
};

const generateApiKey = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'ora_';
  for (let i = 0; i < 28; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default function ApiKeysPage() {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      key: generateApiKey(),
      label: 'My First Key',
      active: true,
      createdAt: 'Jul 30, 2024',
      lastUsed: 'Jul 31, 2024',
    },
  ]);

  const handleGenerateKey = () => {
    const newKey: ApiKey = {
      key: generateApiKey(),
      label: `New Key ${apiKeys.length + 1}`,
      active: true,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastUsed: 'Never',
    };
    setApiKeys([...apiKeys, newKey]);
    toast({
      title: 'API Key Generated',
      description: 'A new API key has been successfully created.',
    });
  };
  
  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: 'API Key Copied',
      description: 'The key has been copied to your clipboard.',
    });
  };

  const toggleKeyStatus = (keyToToggle: string) => {
    setApiKeys(apiKeys.map(k => k.key === keyToToggle ? { ...k, active: !k.active } : k));
  };
  
  const deleteKey = (keyToDelete: string) => {
    setApiKeys(apiKeys.filter(k => k.key !== keyToDelete));
    toast({
      variant: 'destructive',
      title: 'API Key Deleted',
      description: 'The API key has been permanently deleted.',
    });
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">API Keys</h1>
        <Button onClick={handleGenerateKey}>
          <Plus className="mr-2 h-4 w-4" />
          Generate New Key
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>
            Manage your API keys for programmatic access to ORA services.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.key} className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-grow space-y-2">
                <div className="flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{apiKey.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Input readOnly value={apiKey.key} className="h-8 flex-grow font-mono text-xs" />
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(apiKey.key)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Created: {apiKey.createdAt}</span>
                  <span>Last used: {apiKey.lastUsed}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`active-switch-${apiKey.key}`}
                    checked={apiKey.active}
                    onCheckedChange={() => toggleKeyStatus(apiKey.key)}
                  />
                  <Label htmlFor={`active-switch-${apiKey.key}`} className={apiKey.active ? 'text-green-400' : ''}>
                    {apiKey.active ? 'Active' : 'Inactive'}
                  </Label>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Globe className="mr-2 h-4 w-4" />
                      Allowed Domains
                    </DropdownMenuItem>
                    
                    <AlertDialog>
                       <AlertDialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                            <span className="text-red-500">Delete Key</span>
                          </DropdownMenuItem>
                       </AlertDialogTrigger>
                       <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your API key and remove its access.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteKey(apiKey.key)} className="bg-destructive hover:bg-destructive/90">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                       </AlertDialogContent>
                    </AlertDialog>

                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
