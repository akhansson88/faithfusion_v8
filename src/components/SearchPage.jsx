import React, { useState, useEffect } from 'react';
    import { ref, get, onValue } from 'firebase/database';
    import { rtdb, storage } from '../firebase';
    import { getDownloadURL, ref as storageRef, listAll } from 'firebase/storage';
    import SearchFilters from './SearchFilters.jsx';
    import SearchResultsInfo from './SearchResultsInfo.jsx';
    import ProfileCard from './ProfileCard.jsx';
    import Pagination from './Pagination.jsx';
    import ChatBubble from './ChatBubble.jsx';

    function SearchPage() {
      const [profiles, setProfiles] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [onlineStatuses, setOnlineStatuses] = useState({});
      const [profileImages, setProfileImages] = useState({});
      const [interests, setInterests] = useState({});
      const [galleryImages, setGalleryImages] = useState({});
      const [chatBubbleOpen, setChatBubbleOpen] = useState(false);
      const [selectedUser, setSelectedUser] = useState(null);

      useEffect(() => {
        const fetchActiveProfiles = async () => {
          setLoading(true);
          setError(null);
          try {
            const usersRef = ref(rtdb, 'users');
            const snapshot = await get(usersRef);
            if (snapshot.exists()) {
              const users = snapshot.val();
              // Filter out inactive profiles
              const activeProfiles = Object.entries(users)
                .filter(([, user]) => user.isProfileActive)
                .map(([uid, user]) => ({ uid, ...user }));
              setProfiles(activeProfiles);
            } else {
              setProfiles([]);
            }
          } catch (e) {
            setError(e);
            console.error("Error fetching profiles:", e);
          } finally {
            setLoading(false);
          }
        };

        fetchActiveProfiles();
      }, []);

      useEffect(() => {
        // Fetch online statuses for all active profiles
        const fetchOnlineStatuses = () => {
          const statuses = {};
          profiles.forEach(profile => {
            const userStatusRef = ref(rtdb, `users/${profile.uid}/online`);
            onValue(userStatusRef, (snapshot) => {
              statuses[profile.uid] = snapshot.val() || false;
              setOnlineStatuses(prevStatuses => ({ ...prevStatuses, [profile.uid]: snapshot.val() || false }));
            });
          });
        };

        if (profiles.length > 0) {
          fetchOnlineStatuses();
        }

        return () => {
          // Clean up listeners (if needed) - Firebase handles this automatically
        };
      }, [profiles]);

      useEffect(() => {
        // Fetch profile and gallery images for all active profiles
        const fetchImages = async () => {
          const profileImagesData = {};
          const galleryImagesData = {};

          for (const profile of profiles) {
            try {
              const profileImageRef = storageRef(storage, `profileImages/${profile.uid}/profileImage`);
              const profileImageUrl = await getDownloadURL(profileImageRef);
              profileImagesData[profile.uid] = profileImageUrl;
            } catch (error) {
              // If the image doesn't exist, it's fine, just don't set the URL
              if (error.code !== 'storage/object-not-found') {
                console.error(`Error fetching profile image for ${profile.uid}:`, error);
              }
              profileImagesData[profile.uid] = null; // Set to null if no image
            }

            try {
              const galleryListRef = storageRef(storage, `images/${profile.uid}`);
              const res = await listAll(galleryListRef);
              const urls = await Promise.all(res.items.map(async (itemRef) => {
                return await getDownloadURL(itemRef);
              }));
              galleryImagesData[profile.uid] = urls;
            } catch (error) {
              console.error(`Error fetching gallery images for ${profile.uid}:`, error);
              galleryImagesData[profile.uid] = [];
            }
          }
          setProfileImages(profileImagesData);
          setGalleryImages(galleryImagesData);
        };

        if (profiles.length > 0) {
          fetchImages();
        }
      }, [profiles]);

      useEffect(() => {
        // Fetch interests for all active profiles
        const fetchInterests = async () => {
          const interestsData = {};
          for (const profile of profiles) {
            try {
              const interestsRef = ref(rtdb, `users/${profile.uid}/interests`);
              const snapshot = await get(interestsRef);
              if (snapshot.exists()) {
                interestsData[profile.uid] = snapshot.val();
              } else {
                interestsData[profile.uid] = [];
              }
            } catch (error) {
              console.error(`Error fetching interests for ${profile.uid}:`, error);
              interestsData[profile.uid] = [];
            }
          }
          setInterests(interestsData);
        };

        if (profiles.length > 0) {
          fetchInterests();
        }
      }, [profiles]);

      const openChatBubble = (user) => {
        setSelectedUser(user);
        setChatBubbleOpen(true);
      };

      const closeChatBubble = () => {
        setChatBubbleOpen(false);
        setSelectedUser(null);
      };

      if (loading) {
        return <div>Loading...</div>;
      }

      if (error) {
        return <div>Error: {error.message}</div>;
      }

      return (
        <div className="search-wrapper">
          <div className="search-header">
            <h1>Find Your Match</h1>
            <p>Connect with other Christians who share your values and beliefs</p>
          </div>

          <div className="search-container">
            <SearchFilters />
            <SearchResultsInfo profiles={profiles} />

            <div className="search-results">
              {profiles.map((profile) => (
                <ProfileCard
                  key={profile.uid}
                  profile={profile}
                  profileImages={profileImages}
                  galleryImages={galleryImages}
                  onlineStatuses={onlineStatuses}
                  interests={interests}
                  openChatBubble={openChatBubble}
                />
              ))}
            </div>

            <Pagination />
          </div>
          {chatBubbleOpen && selectedUser && (
            <ChatBubble user={selectedUser} onClose={closeChatBubble} />
          )}
        </div>
      );
    }

    export default SearchPage;
